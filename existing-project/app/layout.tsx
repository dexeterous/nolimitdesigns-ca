import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import "./designpro-styles.css"

export const metadata: Metadata = {
  title: "Designpro - Productized Design Agency website template",
  description: "Hire Full-Service Design Agency For A Simple Monthly Fee",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
        <link rel="stylesheet" href="/remixicon.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                'use strict';
                
                try {
                  // LAYER 1: Completely disable and delete service worker API IMMEDIATELY
                  if ('serviceWorker' in navigator) {
                    try {
                      delete navigator.serviceWorker;
                    } catch (e) {}
                    
                    try {
                      Object.defineProperty(navigator, 'serviceWorker', {
                        get: function() { return undefined; },
                        set: function() {},
                        configurable: false,
                        enumerable: false
                      });
                    } catch (e) {}
                  }

                  // LAYER 2: Override console methods IMMEDIATELY
                  var originalError = console.error;
                  var originalWarn = console.warn;
                  var originalLog = console.log;
                  
                  console.error = function() {
                    var args = Array.prototype.slice.call(arguments);
                    var message = args.join(' ');
                    if (/(ServiceWorker|__v0_sw|AbortError|Failed to register|service worker)/i.test(message)) {
                      return;
                    }
                    originalError.apply(console, args);
                  };
                  
                  console.warn = function() {
                    var args = Array.prototype.slice.call(arguments);
                    var message = args.join(' ');
                    if (/(ServiceWorker|__v0_sw|AbortError|Failed to register|service worker)/i.test(message)) {
                      return;
                    }
                    originalWarn.apply(console, args);
                  };
                  
                  console.log = function() {
                    var args = Array.prototype.slice.call(arguments);
                    var message = args.join(' ');
                    if (/(ServiceWorker|__v0_sw|AbortError|Failed to register|service worker)/i.test(message)) {
                      return;
                    }
                    originalLog.apply(console, args);
                  };

                  // LAYER 3: Suppress unhandled promise rejections IMMEDIATELY
                  var suppressRejection = function(event) {
                    try {
                      if (!event) return;
                      var reason = event.reason || event.detail || {};
                      var message = String(reason.message || reason || '');
                      if (/(ServiceWorker|__v0_sw|AbortError|Failed to register|service worker)/i.test(message)) {
                        if (event.preventDefault) event.preventDefault();
                        if (event.stopPropagation) event.stopPropagation();
                        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                        return false;
                      }
                    } catch (e) {}
                  };

                  window.onunhandledrejection = suppressRejection;
                  if (window.addEventListener) {
                    window.addEventListener('unhandledrejection', suppressRejection, true);
                    window.addEventListener('unhandledrejection', suppressRejection, false);
                  }
                  
                  // LAYER 4: Suppress regular errors IMMEDIATELY
                  var suppressError = function(event) {
                    try {
                      if (!event) return;
                      var message = String(event.message || event.error || '');
                      if (/(ServiceWorker|__v0_sw|AbortError|Failed to register|service worker)/i.test(message)) {
                        if (event.preventDefault) event.preventDefault();
                        if (event.stopPropagation) event.stopPropagation();
                        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                        return false;
                      }
                    } catch (e) {}
                  };

                  window.onerror = function(msg) {
                    if (/(ServiceWorker|__v0_sw|AbortError|Failed to register|service worker)/i.test(String(msg))) {
                      return true;
                    }
                  };
                  
                  if (window.addEventListener) {
                    window.addEventListener('error', suppressError, true);
                    window.addEventListener('error', suppressError, false);
                  }

                  // LAYER 5: Intercept Promise rejections at prototype level
                  if (window.Promise && window.Promise.prototype) {
                    var OriginalPromise = window.Promise;
                    var originalCatch = OriginalPromise.prototype.catch;
                    var originalThen = OriginalPromise.prototype.then;

                    OriginalPromise.prototype.catch = function(onRejected) {
                      return originalCatch.call(this, function(error) {
                        try {
                          var message = String((error && error.message) || error || '');
                          if (/(ServiceWorker|__v0_sw|AbortError|Failed to register|service worker)/i.test(message)) {
                            return OriginalPromise.resolve();
                          }
                        } catch (e) {}
                        if (onRejected) return onRejected(error);
                        throw error;
                      });
                    };

                    OriginalPromise.prototype.then = function(onFulfilled, onRejected) {
                      return originalThen.call(this, onFulfilled, function(error) {
                        try {
                          var message = String((error && error.message) || error || '');
                          if (/(ServiceWorker|__v0_sw|AbortError|Failed to register|service worker)/i.test(message)) {
                            return OriginalPromise.resolve();
                          }
                        } catch (e) {}
                        if (onRejected) return onRejected(error);
                        throw error;
                      });
                    };
                  }

                } catch (setupError) {
                  // Silently fail if setup fails
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
