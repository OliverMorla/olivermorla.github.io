"use client";

const ThemeScript = () => {
  const themeScript = `
    (function() {
      try {
        const storedTheme = localStorage.getItem('theme') || 'system';
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = storedTheme === 'system' ? systemTheme : storedTheme;
        
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.style.colorScheme = 'dark';
        }
      } catch (e) {
        console.error(e);
      }
    })()
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
};

export default ThemeScript; 