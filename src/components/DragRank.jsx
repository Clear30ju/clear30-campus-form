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

function SortableItem({ id, label, index, onMoveUp, onMoveDown, isFirst, isLast, isMobile }) {
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
    gap: '12px',
    padding: '14px 16px',
    backgroundColor: 'var(--white)',
    borderRadius: '12px',
    border: '1px solid #E5E5E5',
    boxShadow: isDragging ? '0px 4px 20px rgba(0, 0, 0, 0.15)' : '0px 1px 4px rgba(0, 0, 0, 0.06)',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isDragging ? 10 : 1,
    fontSize: 'var(--text-body)',
    fontWeight: 400,
    userSelect: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: 'var(--gradient)',
        color: 'var(--white)',
        fontSize: 'var(--text-micro)',
        fontWeight: 500,
        flexShrink: 0,
      }}>
        {index + 1}
      </span>
      <span style={{ flex: 1 }}>{label}</span>
      {isMobile && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
          <button
            type="button"
            disabled={isFirst}
            onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
            style={{
              border: 'none',
              background: 'none',
              cursor: isFirst ? 'default' : 'pointer',
              opacity: isFirst ? 0.3 : 1,
              padding: '2px 6px',
              fontSize: '14px',
              lineHeight: 1,
            }}
          >
            &#9650;
          </button>
          <button
            type="button"
            disabled={isLast}
            onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
            style={{
              border: 'none',
              background: 'none',
              cursor: isLast ? 'default' : 'pointer',
              opacity: isLast ? 0.3 : 1,
              padding: '2px 6px',
              fontSize: '14px',
              lineHeight: 1,
            }}
          >
            &#9660;
          </button>
        </div>
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
    <div style={{ marginBottom: '28px' }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: 'var(--text-micro)',
          fontWeight: 500,
          color: 'var(--black)',
          marginBottom: '6px',
        }}>
          {label}
        </label>
      )}
      {helperText && (
        <p style={{
          fontSize: '13px',
          fontWeight: 400,
          color: '#888',
          marginBottom: '10px',
          lineHeight: 1.4,
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
                index={index}
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
          color: '#e53e3e',
          marginTop: '4px',
        }}>
          {error}
        </p>
      )}
    </div>
  );
}
