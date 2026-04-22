import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function DragHandle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden
         style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}>
      <circle cx="5" cy="3" r="1.3" fill="currentColor" />
      <circle cx="11" cy="3" r="1.3" fill="currentColor" />
      <circle cx="5" cy="8" r="1.3" fill="currentColor" />
      <circle cx="11" cy="8" r="1.3" fill="currentColor" />
      <circle cx="5" cy="13" r="1.3" fill="currentColor" />
      <circle cx="11" cy="13" r="1.3" fill="currentColor" />
    </svg>
  );
}

function SortableItem({ id, label, rank, onMoveUp, onMoveDown, isFirst, isLast, isMobile }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 18px',
    backgroundColor: 'var(--white)',
    borderRadius: 'var(--radius-input)',
    border: '1px solid var(--light-gray)',
    boxShadow: isDragging ? 'var(--shadow-lifted)' : 'var(--shadow)',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 10 : 1,
    fontSize: 'var(--text-body)',
    fontWeight: 400,
    userSelect: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span
        aria-hidden
        style={{
          fontFamily: 'var(--font-primary)',
          fontSize: 'var(--text-body)',
          fontWeight: 700,
          lineHeight: 1,
          background: 'var(--gradient)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.01em',
          minWidth: '16px',
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        {rank + 1}
      </span>
      <span style={{ flex: 1, lineHeight: 1.4 }}>{label}</span>
      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
          <button
            type="button"
            disabled={isFirst}
            aria-label="Move up"
            onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
            style={{
              border: 'none', background: 'none',
              cursor: isFirst ? 'default' : 'pointer',
              opacity: isFirst ? 0.25 : 0.55,
              padding: '2px 6px', fontSize: '14px', lineHeight: 1,
              color: 'var(--text-primary)',
            }}
          >
            &#9650;
          </button>
          <button
            type="button"
            disabled={isLast}
            aria-label="Move down"
            onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
            style={{
              border: 'none', background: 'none',
              cursor: isLast ? 'default' : 'pointer',
              opacity: isLast ? 0.25 : 0.55,
              padding: '2px 6px', fontSize: '14px', lineHeight: 1,
              color: 'var(--text-primary)',
            }}
          >
            &#9660;
          </button>
        </div>
      ) : (
        <DragHandle />
      )}
    </div>
  );
}

export default function DragRank({ label, helperText, items, value, onChange, error }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const orderedItems = value && value.length > 0
    ? value.map((id) => items.find((item) => item.id === id)).filter(Boolean)
    : items;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = orderedItems.findIndex((i) => i.id === active.id);
      const newIndex = orderedItems.findIndex((i) => i.id === over.id);
      const newOrder = arrayMove(orderedItems, oldIndex, newIndex);
      onChange(newOrder.map((i) => i.id));
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newOrder = arrayMove(orderedItems, index, index - 1);
    onChange(newOrder.map((i) => i.id));
  };

  const handleMoveDown = (index) => {
    if (index === orderedItems.length - 1) return;
    const newOrder = arrayMove(orderedItems, index, index + 1);
    onChange(newOrder.map((i) => i.id));
  };

  return (
    <div style={{ marginBottom: 'var(--space-md)' }}>
      {label && <label className="c30-field-label">{label}</label>}
      {helperText && (
        <p style={{
          fontSize: 'var(--text-micro)',
          fontWeight: 400,
          color: 'var(--text-secondary)',
          marginTop: '-4px',
          marginBottom: '12px',
          lineHeight: 1.45,
        }}>
          {helperText}
        </p>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderedItems.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {orderedItems.map((item, index) => (
              <SortableItem
                key={item.id}
                id={item.id}
                label={item.label}
                rank={index}
                isMobile={isMobile}
                isFirst={index === 0}
                isLast={index === orderedItems.length - 1}
                onMoveUp={() => handleMoveUp(index)}
                onMoveDown={() => handleMoveDown(index)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {error && (
        <p style={{
          fontSize: 'var(--text-micro)',
          color: 'var(--red)',
          marginTop: '6px',
        }}>
          {error}
        </p>
      )}
    </div>
  );
}
