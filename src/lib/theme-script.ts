// Runs synchronously in <head>, before hydration, so the correct theme class
// is applied pre-paint and there's no flash of the wrong theme.
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;
