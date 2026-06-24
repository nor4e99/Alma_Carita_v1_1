export function formatPrice(price: number, currency: 'EUR' | 'BGN' = 'EUR'): string {
  return new Intl.NumberFormat('bg-BG', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(price) + ' ' + (currency === 'EUR' ? '€' : 'лв');
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat('bg-BG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return 'току-що';
  if (diffMin < 60) return `преди ${diffMin} мин`;
  if (diffHr < 24) return `преди ${diffHr} ${diffHr === 1 ? 'час' : 'часа'}`;
  if (diffDay < 7) return `преди ${diffDay} ${diffDay === 1 ? 'ден' : 'дни'}`;
  return formatDate(iso);
}

export function typeLabel(type: 'new' | 'old' | 'land'): string {
  switch (type) {
    case 'new': return 'Ново строителство';
    case 'old': return 'Старо строителство';
    case 'land': return 'Земя';
  }
}

export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    active: 'Активен',
    pending: 'В преговори',
    sold: 'Продаден',
    rented: 'Под наем',
    draft: 'Чернова',
  };
  return map[status] ?? status;
}

export function typeColor(type: 'new' | 'old' | 'land'): string {
  switch (type) {
    case 'new': return '#7a8fbb';
    case 'old': return '#e07848';
    case 'land': return '#6aaa7a';
  }
}
