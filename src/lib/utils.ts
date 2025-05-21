
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateImagePlaceholder(text: string): string {
  const colors = [
    '#6C63FF', '#FF6584', '#08D9D6', '#E84A5F', '#FFC75F', 
    '#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F', '#F9F871'
  ];
  
  const hash = text.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  const colorIndex = hash % colors.length;
  
  return `https://via.placeholder.com/400x200/${colors[colorIndex].slice(1)}?text=${encodeURIComponent(text)}`;
}
