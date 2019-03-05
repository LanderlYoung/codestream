﻿using CodeStream.VisualStudio.Core.Logging;
using CodeStream.VisualStudio.Extensions;
using CodeStream.VisualStudio.Packages;
using CodeStream.VisualStudio.Services;
using CodeStream.VisualStudio.UI.Glyphs;
using Microsoft.VisualStudio.Shell;
using Microsoft.VisualStudio.Text;
using Microsoft.VisualStudio.Text.Editor;
using Microsoft.VisualStudio.Text.Formatting;
using Microsoft.VisualStudio.Text.Tagging;
using Serilog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reactive.Linq;
using System.Threading;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using CodeStream.VisualStudio.Models;

namespace CodeStream.VisualStudio.UI.Margins
{
    internal sealed class CodemarkTextViewMargin : Canvas, ICodeStreamWpfTextViewMargin
    {
        private static readonly ILogger Log = LogManager.ForContext<CodemarkTextViewMargin>();
        private static readonly int DefaultMarginWidth = 20;

        public static readonly DependencyProperty ZoomProperty =
            DependencyProperty.RegisterAttached("Zoom", typeof(double), typeof(Codemark),
                new FrameworkPropertyMetadata(0.0, FrameworkPropertyMetadataOptions.Inherits));

        private static readonly object InitializeLock = new object();

        private readonly List<IDisposable> _disposables;
        private readonly DocumentMarkerManager _documentMarkerManager;
        private readonly Dictionary<Type, GlyphFactoryInfo> _glyphFactories;
        private readonly IEnumerable<Lazy<IGlyphFactoryProvider, IGlyphMetadata>> _glyphFactoryProviders;
        private readonly ISessionService _sessionService;
        private readonly ITextDocument _textDocument;
        private readonly IWpfTextView _textView;

        private readonly IToolWindowProvider _toolWindowProvider;

        private readonly IViewTagAggregatorFactoryService _viewTagAggregatorFactoryService;

        private readonly IWpfTextViewHost _wpfTextViewHost;
        private Canvas[] _childCanvases;
        private Canvas _iconCanvas;

        private bool _initialized;
        private bool _isDisposed;
        private Dictionary<object, LineInfo> _lineInfos;
        private ITagAggregator<IGlyphTag> _tagAggregator;

        /// <summary>
        ///     Initializes a new instance of the <see cref="CodemarkTextViewMargin" /> class for a given
        ///     <paramref name="textView" />.
        /// </summary>
        /// <param name="viewTagAggregatorFactoryService"></param>
        /// <param name="glyphFactoryProviders"></param>
        /// <param name="wpfTextViewHost"></param>
        /// <param name="toolWindowProvider"></param>
        /// <param name="sessionService"></param>
        /// <param name="textView"></param>
        /// <param name="textDocument"></param>
        public CodemarkTextViewMargin(
            IViewTagAggregatorFactoryService viewTagAggregatorFactoryService,
            IEnumerable<Lazy<IGlyphFactoryProvider, IGlyphMetadata>> glyphFactoryProviders,
            IWpfTextViewHost wpfTextViewHost,
            IToolWindowProvider toolWindowProvider,
            ISessionService sessionService,
            IWpfTextView textView,
            ITextDocument textDocument)
        {
            Log.Verbose("ctor");

            _viewTagAggregatorFactoryService = viewTagAggregatorFactoryService;
            _glyphFactoryProviders = glyphFactoryProviders;
            _wpfTextViewHost = wpfTextViewHost;
            _toolWindowProvider = toolWindowProvider;
            _sessionService = sessionService;
            _textView = textView;
            _textDocument = textDocument;

            Width = DefaultMarginWidth;
            ClipToBounds = true;

            _disposables = new List<IDisposable>();
            _glyphFactories = new Dictionary<Type, GlyphFactoryInfo>();
            _childCanvases = Array.Empty<Canvas>();
            Background = new SolidColorBrush(Colors.Transparent);

            _documentMarkerManager = _textView
                .Properties
                .GetProperty<DocumentMarkerManager>(PropertyNames.DocumentMarkerManager);

            Debug.Assert(_documentMarkerManager != null, $"{nameof(_documentMarkerManager)} is null");
            TryInitialize();
        }

        private void InitializeMargin()
        {
            _iconCanvas = new Canvas { Background = Brushes.Transparent };

            Children.Add(_iconCanvas);
            _lineInfos = new Dictionary<object, LineInfo>();
            _tagAggregator = _viewTagAggregatorFactoryService.CreateTagAggregator<IGlyphTag>(_wpfTextViewHost.TextView);

            var order = 0;
            foreach (var lazy in _glyphFactoryProviders)
            {
                foreach (var type in lazy.Metadata.TagTypes)
                {
                    if (type == null) break;

                    if (_glyphFactories.ContainsKey(type) || !typeof(IGlyphTag).IsAssignableFrom(type)) continue;
                    if (type == typeof(CodemarkGlyphTag))
                    {
                        var glyphFactory = lazy.Value.GetGlyphFactory(_wpfTextViewHost.TextView, this);
                        _glyphFactories.Add(type, new GlyphFactoryInfo(order++, glyphFactory, lazy.Value));
                    }
                }
            }

            _childCanvases = _glyphFactories.Values.OrderBy(a => a.Order).Select(a => a.Canvas).ToArray();
            _iconCanvas.Children.Clear();

            foreach (var c in _childCanvases)
            {
                _iconCanvas.Children.Add(c);
            }
        }

        public bool IsReady()
        {
            return _sessionService.IsReady;
        }

        public void OnSessionLogout()
        {
            Children.Clear();
            _lineInfos?.Clear();
            _iconCanvas?.Children.Clear();
            _disposables?.Dispose();
            _initialized = false;
        }

        public void OnSessionReady()
        {
            if (_initialized) return;

            lock (InitializeLock)
            {
                if (!_initialized)
                {
                    _disposables.Add(Observable.FromEventPattern(ev => _textView.Selection.SelectionChanged += ev,
                            ev => _textView.Selection.SelectionChanged -= ev)
                        .Sample(TimeSpan.FromMilliseconds(300))
                        .ObserveOnDispatcher()
                        .Subscribe(eventPattern =>
                        {
                            if (_textView.Selection.IsEmpty ||
                                !_toolWindowProvider.IsVisible(Guids.WebViewToolWindowGuid)) return;

                                // TODO cant we get the selected text from the sender somehow??
                                var ideService = Package.GetGlobalService(typeof(SIdeService)) as IIdeService;
                            var selectedTextResult = ideService?.GetTextSelected();
                            if (selectedTextResult?.HasText == false) return;

                            var codeStreamService =
                                Package.GetGlobalService(typeof(SCodeStreamService)) as ICodeStreamService;
                            if (codeStreamService == null) return;

                            codeStreamService.PrepareCodeAsync(new Uri(_textDocument.FilePath), selectedTextResult, CodemarkType.Comment.ToString(),
                                _textDocument.IsDirty, true, CancellationToken.None);

                            var textSelection = eventPattern?.Sender as ITextSelection;
                            Log.Verbose(
                                $"Selection_SelectionChanged Start={textSelection?.Start.Position.Position} End={textSelection?.End.Position.Position}");
                        }));

                    _initialized = true;

                    ShowMargin();
                    _wpfTextViewHost.TextView.ZoomLevelChanged += TextView_ZoomLevelChanged;

                    InitializeMargin();
                    _documentMarkerManager.GetOrCreateMarkers(true);
                    RefreshMargin();
                }
            }
        }

        public void OnMarkerChanged()
        {
            RefreshMargin();
        }

        public void RefreshMargin()
        {
            _lineInfos.Clear();
            foreach (var c in _childCanvases)
            {
                c.Children.Clear();
            }

            OnNewLayout(_wpfTextViewHost.TextView.TextViewLines, Array.Empty<ITextViewLine>());
        }

        public void OnTextViewLayoutChanged(object sender, TextViewLayoutChangedEventArgs e)
        {
            if (Visibility == Visibility.Hidden || Visibility == Visibility.Collapsed) return;

            if (e.OldViewState.ViewportTop != e.NewViewState.ViewportTop)
                SetTop(_iconCanvas, -_wpfTextViewHost.TextView.ViewportTop);

            OnNewLayout(e.NewOrReformattedLines, e.TranslatedLines);
        }

        public void ShowMargin()
        {
            Visibility = Visibility.Visible;
        }

        public void HideMargin()
        {
            Visibility = Visibility.Collapsed;
        }

        public void ToggleMargin(bool isVisible)
        {
            if (isVisible)
            {
                ShowMargin();
            }
            else
            {
                HideMargin();
            }
        }

        public FrameworkElement VisualElement
        {
            get
            {
                ThrowIfDisposed();
                return this;
            }
        }

        public double MarginSize
        {
            get
            {
                ThrowIfDisposed();
                return ActualWidth;
            }
        }

        public bool Enabled
        {
            get
            {
                ThrowIfDisposed();
                return true;
            }
        }

        /// <summary>
        ///     Gets the <see cref="ITextViewMargin" /> with the given <paramref name="marginName" /> or null if no match is found
        /// </summary>
        /// <param name="marginName">The name of the <see cref="ITextViewMargin" /></param>
        /// <returns>The <see cref="ITextViewMargin" /> named <paramref name="marginName" />, or null if no match is found.</returns>
        /// <remarks>
        ///     A margin returns itself if it is passed its own name. If the name does not match and it is a container margin, it
        ///     forwards the call to its children. Margin name comparisons are case-insensitive.
        /// </remarks>
        /// <exception cref="ArgumentNullException"><paramref name="marginName" /> is null.</exception>
        public ITextViewMargin GetTextViewMargin(string marginName)
        {
            // ReSharper disable once ArrangeStaticMemberQualifier
            return string.Equals(marginName, PredefinedCodestreamNames.CodemarkTextViewMargin,
                StringComparison.OrdinalIgnoreCase)
                ? this
                : null;
        }

        /// <summary>
        ///     Disposes an instance of <see cref="CodemarkTextViewMargin" /> class.
        /// </summary>
        public void Dispose()
        {
            if (!_isDisposed)
            {
                _wpfTextViewHost.TextView.ZoomLevelChanged -= TextView_ZoomLevelChanged;
                _tagAggregator?.Dispose();
                _disposables.Dispose();

                Children.Clear();
                _lineInfos?.Clear();
                _iconCanvas?.Children.Clear();

                _isDisposed = true;
            }
        }

        private List<IconInfo> CreateIconInfos(IWpfTextViewLine line)
        {
            var icons = new List<IconInfo>();

            foreach (var mappingSpan in _tagAggregator.GetTags(line.ExtentAsMappingSpan))
            {
                var tag = mappingSpan.Tag;
                if (tag == null)
                {
                    Log.Verbose("Tag is null");
                    continue;
                }

                // Fails if someone forgot to Export(typeof(IGlyphFactoryProvider)) with the correct tag types
                var tagType = tag.GetType();
                var b = _glyphFactories.TryGetValue(tag.GetType(), out var factoryInfo);
                if (!b)
                {
                    Log.Verbose($"Could not find glyph factory for {tagType}");
                    continue;
                }

                foreach (var span in mappingSpan.Span.GetSpans(_wpfTextViewHost.TextView.TextSnapshot))
                {
                    if (!line.IntersectsBufferSpan(span))
                        continue;

                    var elem = factoryInfo.Factory.GenerateGlyph(line, tag);
                    if (elem == null)
                        continue;

                    elem.Measure(new Size(double.PositiveInfinity, double.PositiveInfinity));
                    var iconInfo = new IconInfo(factoryInfo.Order, elem);
                    icons.Add(iconInfo);

                    // ActualWidth isn't always valid when we're here so use the constant
                    SetLeft(elem, (DefaultMarginWidth - elem.DesiredSize.Width) / 2);
                    SetTop(elem, iconInfo.BaseTopValue + line.TextTop);
                }
            }

            return icons;
        }

        void AddLine(Dictionary<object, LineInfo> newInfos, ITextViewLine line)
        {
            var wpfLine = line as IWpfTextViewLine;
            // Debug.Assert(wpfLine != null);
            if (wpfLine == null)
                return;

            var info = new LineInfo(line, CreateIconInfos(wpfLine));
            newInfos.Add(line.IdentityTag, info);
            foreach (var iconInfo in info.Icons)
            {
                _childCanvases[iconInfo.Order].Children.Add(iconInfo.Element);
            }
        }

        void OnNewLayout(IList<ITextViewLine> newOrReformattedLines, IList<ITextViewLine> translatedLines)
        {
            var newInfos = new Dictionary<object, LineInfo>();

            foreach (var line in newOrReformattedLines)
                AddLine(newInfos, line);

            foreach (var line in translatedLines)
            {
                var b = _lineInfos.TryGetValue(line.IdentityTag, out var info);
                if (!b)
                {
#if DEBUG
                    // why are we here?
                    Debugger.Break();
#endif
                    continue;
                }

                _lineInfos.Remove(line.IdentityTag);
                newInfos.Add(line.IdentityTag, info);
                foreach (var iconInfo in info.Icons)
                    SetTop(iconInfo.Element, iconInfo.BaseTopValue + line.TextTop);
            }

            foreach (var line in _wpfTextViewHost.TextView.TextViewLines)
            {
                if (newInfos.ContainsKey(line.IdentityTag))
                    continue;

                if (!_lineInfos.TryGetValue(line.IdentityTag, out var info))
                    continue;

                _lineInfos.Remove(line.IdentityTag);
                newInfos.Add(line.IdentityTag, info);
            }

            foreach (var info in _lineInfos.Values)
            {
                foreach (var iconInfo in info.Icons)
                    _childCanvases[iconInfo.Order].Children.Remove(iconInfo.Element);
            }

            _lineInfos = newInfos;
        }

        public void TryInitialize()
        {
            if (IsReady())
            {
                OnSessionReady();
            }
            else
            {
                HideMargin();
            }
        }

        void TextView_ZoomLevelChanged(object sender, ZoomLevelChangedEventArgs e)
        {
            LayoutTransform = e.ZoomTransform;
            SetValue(ZoomProperty, e.NewZoomLevel / 100);
        }

        /// <summary>
        ///     Checks and throws <see cref="ObjectDisposedException" /> if the object is disposed.
        /// </summary>
        private void ThrowIfDisposed()
        {
            if (_isDisposed)
            {
                throw new ObjectDisposedException(PredefinedCodestreamNames.CodemarkTextViewMargin);
            }
        }

        struct GlyphFactoryInfo
        {
            public int Order { get; }
            public IGlyphFactory Factory { get; }
            public IGlyphFactoryProvider FactoryProvider { get; }
            public Canvas Canvas { get; }

            public GlyphFactoryInfo(int order, IGlyphFactory factory, IGlyphFactoryProvider glyphFactoryProvider)
            {
                Order = order;
                Factory = factory ?? throw new ArgumentNullException(nameof(factory));
                FactoryProvider = glyphFactoryProvider ?? throw new ArgumentNullException(nameof(glyphFactoryProvider));
                Canvas = new Canvas { Background = Brushes.Transparent };
            }
        }

        struct LineInfo
        {
            public ITextViewLine Line { get; }
            public List<IconInfo> Icons { get; }

            public LineInfo(ITextViewLine textViewLine, List<IconInfo> icons)
            {
                Line = textViewLine ?? throw new ArgumentNullException(nameof(textViewLine));
                Icons = icons ?? throw new ArgumentNullException(nameof(icons));
            }
        }

        struct IconInfo
        {
            public UIElement Element { get; }
            public double BaseTopValue { get; }
            public int Order { get; }

            public IconInfo(int order, UIElement element)
            {
                Element = element ?? throw new ArgumentNullException(nameof(element));
                BaseTopValue = GetBaseTopValue(element);
                Order = order;
            }

            static double GetBaseTopValue(UIElement element)
            {
                var top = GetTop(element);
                return double.IsNaN(top) ? 0 : top;
            }
        }
    }
}