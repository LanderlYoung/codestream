import * as path from "path";
import { commands, Disposable, Range, TextDocument, Uri, ViewColumn, window } from "vscode";
import { AccessToken } from "./agent/agentConnection";
import {
	ChannelStreamCreationOptions,
	CodeStreamSession,
	Post,
	Stream,
	StreamThread,
	StreamType
} from "./api/session";
import { GlobalState, openEditor, ShowCodeResult } from "./common";
import { Container } from "./container";
import { StreamThreadId } from "./controllers/streamViewController";
import { Command, createCommandDecorator } from "./system";

const commandRegistry: Command[] = [];
const command = createCommandDecorator(commandRegistry);

export enum BuiltInCommands {
	CloseActiveEditor = "workbench.action.closeActiveEditor",
	CloseAllEditors = "workbench.action.closeAllEditors",
	CursorMove = "cursorMove",
	Diff = "vscode.diff",
	EditorScroll = "editorScroll",
	ExecuteDocumentSymbolProvider = "vscode.executeDocumentSymbolProvider",
	ExecuteCodeLensProvider = "vscode.executeCodeLensProvider",
	Open = "vscode.open",
	NextEditor = "workbench.action.nextEditor",
	PreviewHtml = "vscode.previewHtml",
	RevealLine = "revealLine",
	ReloadWindow = "workbench.action.reloadWindow",
	SetContext = "setContext",
	ShowCodeStream = "workbench.view.extension.codestream",
	ShowReferences = "editor.action.showReferences"
}

type StreamLocator =
	| { type: StreamType.Channel; name: string; create?: ChannelStreamCreationOptions }
	| { type: StreamType.Direct; members: string[]; create?: boolean }
	| { type: StreamType.File; uri: Uri; create?: boolean };

interface IRequiresStream {
	streamThread: StreamThread | StreamThreadId | StreamLocator | undefined;
}

export function isStreamThread(
	streamOrThreadOrLocator: Stream | StreamThread | StreamThreadId | StreamLocator
): streamOrThreadOrLocator is StreamThread {
	return (streamOrThreadOrLocator as StreamThread).stream !== undefined;
}

export function isStreamThreadId(
	streamOrThreadOrLocator: Stream | StreamThread | StreamThreadId | StreamLocator
): streamOrThreadOrLocator is StreamThreadId {
	return (streamOrThreadOrLocator as StreamThreadId).streamId !== undefined;
}

export interface OpenStreamCommandArgs extends IRequiresStream {
	session?: CodeStreamSession;
}

export interface PostCommandArgs extends IRequiresStream {
	text?: string;
	send?: boolean;
	silent?: boolean;
	session?: CodeStreamSession;
}

export interface PostCodeCommandArgs extends IRequiresStream {
	document?: TextDocument;
	range?: Range;
	ref?: string;
	text?: string;
	send?: boolean;
	session?: CodeStreamSession;
}

export class Commands implements Disposable {
	private readonly _disposable: Disposable;

	constructor() {
		this._disposable = Disposable.from(
			...commandRegistry.map(({ name, key, method }) =>
				commands.registerCommand(name, (...args: any[]) => method.apply(this, args))
			)
		);
	}

	dispose() {
		this._disposable && this._disposable.dispose();
	}

	// @command("comparePostFileRevisionWithWorking", { showErrorMessage: "Unable to open post" })
	// async comparePostFileRevisionWithWorking(post?: Post) {
	// 	if (post == null) return;

	// 	const block = await post.codeBlock();
	// 	if (block === undefined) return;

	// 	const file = await Container.git.getFileRevision(block.uri, block.revision!);
	// 	if (file === undefined) return;

	// 	const filename = path.basename(block.uri.fsPath);

	// 	return commands.executeCommand(
	// 		BuiltInCommands.Diff,
	// 		Uri.file(file),
	// 		block.uri,
	// 		`${filename}${
	// 			block.revision !== undefined ? ` (${block.revision.substr(0, 8)})` : ""
	// 		} \u00a0\u27F7\u00a0 ${filename}`,
	// 		{ preview: true, viewColumn: ViewColumn.Beside, selection: block.range }
	// 	);
	// }

	@command("openPostWorkingFile", { showErrorMessage: "Unable to open post" })
	async openPostWorkingFile(post?: Post) {
		if (post == null) return;

		const block = await post.codeBlock();
		if (block === undefined) return ShowCodeResult.RepoNotInWorkspace;

		// FYI, this doesn't always work, see https://github.com/Microsoft/vscode/issues/56097
		let column = Container.streamView.viewColumn as number | undefined;
		if (column !== undefined) {
			column--;
			if (column <= 0) {
				column = undefined;
			}
		}

		// TODO: Need to follow marker to current sha
		return openEditor(block.uri, {
			preview: true,
			viewColumn: column || ViewColumn.Beside,
			selection: block.range
		});
	}

	// @command("openPostFileRevision", { showErrorMessage: "Unable to open post" })
	// async openPostFileRevision(post?: Post) {
	// 	if (post == null) return;

	// 	const block = await post.codeBlock();
	// 	if (block === undefined) return;

	// 	const file = await Container.git.getFileRevision(block.uri, block.revision!);
	// 	if (file === undefined) return;

	// 	return openEditor(Uri.file(file), {
	// 		preview: true,
	// 		viewColumn: ViewColumn.Beside,
	// 		selection: block.range
	// 	});
	// }

	@command("openStream", { showErrorMessage: "Unable to open stream" })
	async openStream(args: OpenStreamCommandArgs): Promise<StreamThread | undefined> {
		if (args == null) return undefined;

		const streamThread = await this.findStreamThread(args.session || Container.session, args, {
			includeActive: true,
			includeDefault: true
		});
		if (streamThread === undefined) return undefined;

		return Container.streamView.show(streamThread);
	}

	@command("post", { showErrorMessage: "Unable to post message" })
	async post(args: PostCommandArgs): Promise<Post | StreamThread> {
		if (args == null) {
			args = {} as PostCommandArgs;
		}

		const streamThread = await this.findStreamThread(args.session || Container.session, args, {
			includeActive: true,
			includeDefault: true /*!args.send*/
		});
		if (streamThread === undefined) throw new Error(`No stream could be found`);

		if (args.send && args.text) {
			if (!args.silent) {
				await this.openStream({ streamThread: streamThread });
			}
			return streamThread.stream.post(args.text, streamThread.id);
		}

		if (args.text) {
			await Container.streamView.post(streamThread, args.text);
			return streamThread;
		}

		return (await this.openStream({ streamThread: streamThread }))!;
	}

	@command("postCode", { showErrorMessage: "Unable to add comment" })
	async postCode(args: PostCodeCommandArgs) {
		if (args == null) {
			args = {} as PostCodeCommandArgs;
		}

		let document;
		let selection;
		if (args.document === undefined || args.range === undefined) {
			const editor = window.activeTextEditor;
			if (editor === undefined) return undefined;

			document = editor.document;
			selection = editor.selection;
			if (selection.start.isEqual(selection.end)) return undefined;
		} else {
			({ document, range: selection } = args);
		}

		if (document === undefined || selection === undefined) return undefined;

		const response = await Container.agent.preparePost(document, selection);
		const streamThread = await Container.streamView.postCode(
			response.code,
			document.uri,
			selection,
			response.source
		);
		return streamThread !== undefined ? streamThread.stream : undefined;
	}

	@command("runServiceAction")
	runServiceAction(args: { commandUri: string }) {
		if (args == null) return;

		return Container.linkActions.execute(args.commandUri);
	}

	@command("signIn", { customErrorHandling: true })
	async signIn() {
		let token = Container.context.globalState.get<AccessToken | string>(GlobalState.AccessToken);
		if (typeof token === "string") {
			token = { value: token };
		}

		if (!Container.config.email || !token) {
			await Container.streamView.show();
		} else {
			await Container.session.login(Container.config.email, token);
		}
	}

	@command("signOut")
	signOut() {
		return Container.session.logout();
	}

	@command("toggle")
	toggle() {
		return Container.streamView.toggle();
	}

	private async findStreamThread(
		session: CodeStreamSession,
		threadOrLocator: IRequiresStream,
		options: { includeActive?: boolean; includeDefault?: boolean } = {}
	): Promise<StreamThread | undefined> {
		if (threadOrLocator !== undefined && threadOrLocator.streamThread !== undefined) {
			if (isStreamThread(threadOrLocator.streamThread)) return threadOrLocator.streamThread;

			if (isStreamThreadId(threadOrLocator.streamThread)) {
				const stream = await session.getStream(threadOrLocator.streamThread.streamId);
				return stream !== undefined
					? { id: threadOrLocator.streamThread.id, stream: stream }
					: undefined;
			}

			const locator = threadOrLocator.streamThread;

			let stream;
			switch (locator.type) {
				case StreamType.Channel:
					if (locator.create) {
						return {
							id: undefined,
							stream: await session.channels.getOrCreateByName(locator.name, locator.create)
						};
					}

					stream = await session.channels.getByName(locator.name);
					break;

				case StreamType.Direct:
					if (locator.create) {
						return {
							id: undefined,
							stream: await session.directMessages.getOrCreateByMembers(locator.members)
						};
					}

					stream = await session.directMessages.getByMembers(locator.members);
					break;

				// case StreamType.File:
				// 	const repo = await session.repos.getByFileUri(locator.uri);
				// 	if (repo !== undefined) {
				// 		if (locator.create) {
				// 			return { id: undefined, stream: await repo.streams.getOrCreateByUri(locator.uri) };
				// 		}

				// 		stream = await repo.streams.getByUri(locator.uri);
				// 		break;
				// 	}
			}

			if (stream !== undefined) return { id: undefined, stream: stream };
		}

		let streamThread;
		if (options.includeActive) {
			streamThread = Container.streamView.activeStreamThread;
		}

		if (streamThread === undefined && options.includeDefault) {
			streamThread = { id: undefined, stream: await session.getDefaultTeamChannel() };
		}

		return streamThread;
	}
}
