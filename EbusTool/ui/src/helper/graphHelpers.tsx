export function getGraphHeight() {
  const footerHeight = document.getElementById('mainFooter')?.offsetHeight ?? 0;
  const headerHeight = document.getElementById('mainHeader')?.offsetHeight ?? 0;
  const vh = window.innerHeight;

  return (vh - footerHeight - headerHeight) * 0.9;
}

export function getGraphWidth() {
  const vw = window.innerWidth;
  return vw * 0.8;
}

export const lineColor1 = 'var(--pink)';
export const lineColor2 = 'var(--skyBlue2)';
export const lineColor3 = 'var(--deepBlue)';
