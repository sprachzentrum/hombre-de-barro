import FadeIn from "@/components/ui/FadeIn";
import type { StatItem } from "@/app/lib/types";
import styles from "./StatsBar.module.css";

interface StatsBarProps {
  items?: StatItem[];
}

export default function StatsBar({ items }: StatsBarProps) {
  if (!items?.length) return null;
  return (
    <FadeIn>
      <div className={styles.bar}>
        {items.map((s) => (
          <div key={s.id} className={styles.stat}>
            <div className={styles.num}>{s.numero}</div>
            <div className={styles.lbl}>{s.etiqueta}</div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
