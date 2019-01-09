﻿using CodeStream.VisualStudio.Core.Logging;
using CodeStream.VisualStudio.Extensions;
using Microsoft.VisualStudio.PlatformUI;
using Microsoft.VisualStudio.Shell;
using Serilog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Resources;
using System.Windows;
using System.Windows.Media;
using Task = System.Threading.Tasks.Task;

namespace CodeStream.VisualStudio.Services
{
    public class WindowEventArgs
    {
        public WindowEventArgs(string message)
        {
            Message = message;
        }

        public string Message { get; }
    }

    public interface SBrowserService { }

    public interface IBrowserService : IDisposable
    {
        void Initialize();
        /// <summary>
        /// Sends the string to the web view
        /// </summary>
        /// <param name="message"></param>
        void PostMessage(string message);
        /// <summary>
        /// Object to be JSON-serialized before sending to the webview
        /// </summary>
        /// <param name="message"></param>
        void PostMessage(object message);

        void LoadHtml(string html);
        void AddWindowMessageEvent(WindowMessageHandler handler);
        /// <summary>
        /// Attaches the control to the parent element
        /// </summary>
        /// <param name="frameworkElement"></param>
        void AttachControl(FrameworkElement frameworkElement);
        /// <summary>
        /// Any custom html required by the Browser instance
        /// </summary>
        string FooterHtml { get; }
        /// <summary>
        /// Loads the webview
        /// </summary>
        void LoadWebView();
        /// <summary>
        /// waiting / loading / pre-LSP page
        /// </summary>
        void LoadSplashView();
        /// <summary>
        /// Reloads the webview completely
        /// </summary>
        void ReloadWebView();
    }

    public delegate Task WindowMessageHandler(object sender, WindowEventArgs e);

    public abstract class BrowserServiceBase : IBrowserService, SBrowserService
    {
        private static readonly ILogger Log = LogManager.ForContext<BrowserServiceBase>();

        public virtual void Initialize()
        {
            Log.Verbose($"{GetType()} {nameof(Initialize)} Browser...");
            OnInitialized();
            Log.Verbose($"{GetType()} {nameof(Initialize)} Browser");
        }

        protected virtual void OnInitialized()
        {

        }

        public virtual string FooterHtml { get; } = "";

        public abstract void AddWindowMessageEvent(WindowMessageHandler handler);

        public abstract void AttachControl(FrameworkElement frameworkElement);

        public virtual void LoadHtml(string html) { }

        public virtual void PostMessage(string message) { }

        public virtual void PostMessage(object message)
        {
            PostMessage(message.ToJson());
        }

        public void LoadWebView()
        {
            LoadHtml(CreateHarness(Assembly.GetAssembly(typeof(BrowserServiceBase)), "webview"));
        }

        public void LoadSplashView()
        {
            LoadHtml(CreateHarness(Assembly.GetAssembly(typeof(BrowserServiceBase)), "waiting"));
        }

        public void ReloadWebView()
        {
            LoadWebView();
        }

        private string CreateHarness(Assembly assembly, string resourceName)
        {
            var resourceManager = new ResourceManager("VSPackage", Assembly.GetExecutingAssembly());
            var dir = Path.GetDirectoryName(assembly.Location);
            Debug.Assert(dir != null, nameof(dir) + " != null");
            // ReSharper disable once ResourceItemNotResolved
            var harness = resourceManager.GetString(resourceName);
            Debug.Assert(harness != null, nameof(harness) + " != null");

            harness = harness
                        .Replace("{root}", dir.Replace(@"\", "/"))
                        .Replace("{footerHtml}", FooterHtml);
            // ReSharper disable once ResourceItemNotResolved
            var theme = resourceManager.GetString("theme");
            harness = harness.Replace(@"<style id=""theme""></style>", $@"<style id=""theme"">{GenerateTheme(theme)}</style>");
#if RELEASE
            Log.Verbose(harness);
#endif
            return harness;
        }

        private static string GenerateTheme(string stylesheet)
        {
            // [BC] this is some helper code to generate a theme color palette

            //var d = new System.Collections.Generic.Dictionary<string, string>();
            //Type type = typeof(EnvironmentColors); // MyClass is static class with static properties
            //foreach (var p in type.GetProperties().Where(_ => _.Name.StartsWith("ToolWindow")))
            //{
            //    var val = typeof(EnvironmentColors).GetProperty(p.Name, BindingFlags.Public | BindingFlags.Static);
            //    var v = val.GetValue(null);
            //    var trk = v as ThemeResourceKey;
            //    if (trk != null)
            //    {
            //        var color = VSColorTheme.GetThemedColor(trk);
            //        d.Add(p.Name, color.ToHex());
            //    }

            //    // d.Add(p.Name, ((System.Drawing.Color)val).ToHex());
            //}

            //string s = "";
            //foreach (var kvp in d)
            //{
            //    s += $@"<div>";
            //    s += $@"<span style='display:inline-block; height:50ps; width: 50px; background:{kvp.Value}; padding-right:5px; margin-right:5px;'>&nbsp;</span>";
            //    s += $@"<span>{kvp.Value} - {kvp.Key}</span>";
            //    s += "</div>";
            //}

            foreach (var item in ColorThemeMap)
            {
                stylesheet = stylesheet.Replace("--cs--" + item.Key + "--", VSColorTheme.GetThemedColor(item.Value).ToHex());
            }

            var fontFamilyString = "Arial, Consolas, sans-serif";
            var fontFamily = System.Windows.Application.Current.FindResource(VsFonts.EnvironmentFontFamilyKey) as FontFamily;
            if (fontFamily != null)
            {
                fontFamilyString = fontFamily.ToString();
            }

            stylesheet = stylesheet.Replace("--cs--font-family--", fontFamilyString);
            stylesheet = stylesheet.Replace("--cs--vscode-editor-font-family--", fontFamilyString);

            var fontSizeInt = 13;
            var fontSize = System.Windows.Application.Current.FindResource(VsFonts.EnvironmentFontSizeKey);
            if (fontSize != null)
            {
                fontSizeInt = int.Parse(fontSize.ToString());
            }
            stylesheet = stylesheet.Replace("--cs--font-size--", fontSizeInt.ToString());

            var backgroundColor = VSColorTheme.GetThemedColor(EnvironmentColors.ToolWindowBackgroundColorKey);
            stylesheet = stylesheet.Replace("--cs--background-color-darker--", backgroundColor.Darken().ToHex());
            stylesheet = stylesheet.Replace("--cs--app-background-image-color--", backgroundColor.IsDark() ? "#fff" : "#000");
#if RELEASE
            Log.Verbose(stylesheet);
#endif
            return stylesheet;
        }

        private bool _isDisposed;
        public void Dispose()
        {
            if (!_isDisposed)
            {
                Log.Verbose("Browser Dispose...");

                Dispose(true);
                _isDisposed = true;
            }
        }

        protected virtual void Dispose(bool disposing)
        {
        }

        private static readonly Dictionary<string, ThemeResourceKey> ColorThemeMap = new Dictionary<string, ThemeResourceKey>
        {
            {"app-background-color",                   EnvironmentColors.ToolWindowBackgroundColorKey},
            {"base-border-color",                      EnvironmentColors.ToolWindowBorderColorKey},
            {"color",                                  EnvironmentColors.ToolWindowTextColorKey},
            {"background-color",                       EnvironmentColors.ToolWindowBackgroundColorKey},
            {"link-color",                             EnvironmentColors.ToolWindowTextColorKey},

            {"vscode-button-hoverBackground",          EnvironmentColors.ToolWindowButtonDownBorderColorKey},
            {"vscode-sideBarSectionHeader-background", EnvironmentColors.ToolWindowContentGridColorKey},
            {"vscode-sideBarSectionHeader-foreground", EnvironmentColors.ToolWindowTextColorKey},

            {"vs-accent-color",                        EnvironmentColors.ToolWindowButtonInactiveColorKey},

            {"vs-btn-background",                      EnvironmentColors.ToolWindowButtonInactiveGlyphColorKey},
            {"vs-btn-color",                           EnvironmentColors.ToolWindowButtonHoverActiveGlyphColorKey},

            {"vs-btn-primary-background",              EnvironmentColors.ToolWindowButtonDownColorKey},
            {"vs-btn-primary-color",                   EnvironmentColors.ToolWindowButtonDownActiveGlyphColorKey},

            {"vs-input-background",                    EnvironmentColors.ToolWindowButtonHoverInactiveColorKey},
            {"vs-background-accent",                   EnvironmentColors.ToolWindowTabMouseOverBackgroundBeginColorKey},
            {"vs-input-outline",                       EnvironmentColors.ToolWindowButtonHoverActiveBorderColorKey},
            {"vs-post-separator",                      EnvironmentColors.ToolWindowBorderColorKey},
        };

    }

    public class NullBrowserService : BrowserServiceBase
    {
        // ReSharper disable once NotAccessedField.Local
        private readonly IAsyncServiceProvider _serviceProvider;
        public NullBrowserService(IAsyncServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public override void AddWindowMessageEvent(WindowMessageHandler handler)
        {

        }

        public override void AttachControl(FrameworkElement frameworkElement)
        {

        }
    }
}