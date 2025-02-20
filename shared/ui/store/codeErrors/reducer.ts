import { createSelector } from "reselect";
import { toMapBy } from "../../utils";
import { ActionType, Index } from "../common";
import * as actions from "./actions";
import * as activeIntegrationsActions from "../activeIntegrations/actions";
import { CodeErrorsActionsTypes, CodeErrorsState } from "./types";
import { CSCodeError } from "@codestream/protocols/api";
import { CodeStreamState } from "..";
import { ActiveIntegrationsActionType } from "../activeIntegrations/types";
import { getTeamMates } from "../users/reducer";
import { ContextState } from "../context/types";

type CodeErrorsActions = ActionType<typeof actions>;
type ActiveIntegrationsActions = ActionType<typeof activeIntegrationsActions>;

const initialState: CodeErrorsState = { bootstrapped: false, codeErrors: {}, errorGroups: {} };

export function reduceCodeErrors(
	state = initialState,
	action: CodeErrorsActions | ActiveIntegrationsActions
): CodeErrorsState {
	switch (action.type) {
		case CodeErrorsActionsTypes.Bootstrap:
			return {
				bootstrapped: true,
				errorGroups: state.errorGroups,
				codeErrors: { ...state.codeErrors, ...toMapBy("id", action.payload) }
			};
		case CodeErrorsActionsTypes.AddCodeErrors:
		case CodeErrorsActionsTypes.UpdateCodeErrors:
		case CodeErrorsActionsTypes.SaveCodeErrors: {
			return {
				bootstrapped: state.bootstrapped,
				errorGroups: state.errorGroups,
				codeErrors: { ...state.codeErrors, ...toMapBy("id", action.payload) }
			};
		}
		case CodeErrorsActionsTypes.Delete: {
			const nextCodeErrors = { ...state.codeErrors };
			delete nextCodeErrors[action.payload];
			return {
				bootstrapped: state.bootstrapped,
				codeErrors: nextCodeErrors,
				errorGroups: state.errorGroups
			};
		}
		case CodeErrorsActionsTypes.SetErrorGroup: {
			const nextErrorGroups = { ...state.errorGroups };

			nextErrorGroups[action.payload.id] = {
				errorGroup: action.payload.data,
				id: action.payload.id
			};
			return {
				...state,
				errorGroups: nextErrorGroups
			};
		}
		case CodeErrorsActionsTypes.IsLoadingErrorGroup: {
			const nextErrorGroups = { ...state.errorGroups };
			nextErrorGroups[action.payload.id] = {
				...nextErrorGroups[action.payload.id],
				isLoading: action.payload.data.isLoading
			};
			return {
				...state,
				errorGroups: nextErrorGroups
			};
		}
		case ActiveIntegrationsActionType.DeleteForProvider: {
			// if the user is disconnecting from NR, remove all the errorGroups
			if (action.payload.providerId === "newrelic*com") {
				return {
					...state,
					errorGroups: {}
				};
			} else {
				return state;
			}
		}
		case CodeErrorsActionsTypes.HandleDirectives: {
			const nextErrorGroups = { ...state.errorGroups };
			nextErrorGroups[action.payload.id] = {
				...nextErrorGroups[action.payload.id]
			};

			const errorGroupWrapper = nextErrorGroups[action.payload.id];
			if (errorGroupWrapper.errorGroup) {
				for (const directive of action.payload.data) {
					switch (directive.type) {
						case "assignRepository": {
							if (errorGroupWrapper.errorGroup.entity) {
								errorGroupWrapper.errorGroup.entity.repo = directive.data.repo;
							}
							break;
						}
						case "removeAssignee": {
							errorGroupWrapper.errorGroup.assignee = null;
							break;
						}
						case "setAssignee": {
							errorGroupWrapper.errorGroup.assignee = directive.data.assignee;
							break;
						}
						case "setState": {
							errorGroupWrapper.errorGroup.state = directive.data.state;
							break;
						}
					}
				}
			}
			return { ...state, errorGroups: nextErrorGroups };
		}
		case "RESET":
			return initialState;
		default:
			return state;
	}
}

export function getCodeError(state: CodeErrorsState, id: string): CSCodeError | undefined {
	return state.codeErrors[id];
}

// TODO fix me get the type for the result
export function getErrorGroup(
	state: CodeErrorsState,
	codeError: CSCodeError | undefined
): any | undefined {
	if (!codeError || codeError.objectType !== "errorGroup" || !codeError.objectId) return undefined;
	return state.errorGroups[codeError.objectId!]?.errorGroup;
}

export function getByStatus(state: CodeStreamState, status?: string): CSCodeError[] {
	if (!status) return getAllCodeErrors(state);

	return getAllCodeErrors(state).filter(codeError => codeError.status === status);
}

const getCodeErrors = (state: CodeStreamState) => state.codeErrors.codeErrors;

export const getCurrentCodeErrorId = createSelector(
	(state: CodeStreamState) => state.context,
	(context: ContextState) => {
		return context.currentCodeErrorId || "";
	}
);

export const getCodeErrorCreator = createSelector(
	getCodeErrors,
	getCurrentCodeErrorId,
	getTeamMates,
	(codeErrors, id, teamMates) => {
		if (!teamMates) return undefined;
		const codeError = codeErrors[id];
		if (!codeError || !codeError.creatorId) return undefined;
		return teamMates.find(_ => _.id === codeError.creatorId);
	}
);

export const getByStatusAndUser = createSelector(
	getCodeErrors,
	(a, status) => status,
	(a, b, userId) => userId,
	(codeErrors, status, userId) => {
		return Object.values(codeErrors).filter(
			codeError =>
				!codeError.deactivated &&
				codeError.status === status &&
				(codeError.creatorId === userId ||
					(codeError.assignees || []).includes(userId) ||
					(codeError.codeAuthorIds || []).includes(userId) ||
					(codeError.followerIds || []).includes(userId))
		);
	}
);

export const getAllCodeErrors = createSelector(getCodeErrors, (codeErrors: Index<CSCodeError>) =>
	Object.values(codeErrors).filter(codeError => !codeError.deactivated)
);

export const getAllCodeErrorLinks = createSelector(
	getCodeErrors,
	(codeErrors: Index<CSCodeError>) =>
		Object.values(codeErrors)
			.filter(codeError => !codeError.deactivated && codeError.permalink)
			.map(_ => {
				return {
					id: _.id,
					permalink: _.permalink
				};
			})
);

export const teamHasCodeErrors = createSelector(getCodeErrors, (codeErrors: Index<CSCodeError>) => {
	return Object.keys(codeErrors).length > 0;
});

export const teamCodeErrorCount = createSelector(
	getCodeErrors,
	(codeErrors: Index<CSCodeError>) => {
		return Object.keys(codeErrors).length;
	}
);

export const getCodeErrorsUnread = createSelector(
	getCodeErrors,
	(codeErrors: Index<CSCodeError>) => {
		let ret = {};
	}
);
