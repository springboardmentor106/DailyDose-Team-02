import React from 'react';
const TargetCheckbox = ({ target, onToggle }) => {
  const handleCheckboxChange = () => {
    const newCompleted = !target.completed; // Toggle the completed status
    onToggle(target.id, newCompleted); // Notify parent component of toggle
  };
  return (
    <div className='checkbox'>
      <input
        type="checkbox"
        checked={target.completed}
        onChange={handleCheckboxChange}
      />
      <label>{target.name}  
      <div className='status'>
      {target.completed ? 'Completed' : 'Not Completed'}
      </div>
      </label>
    </div>
  );
};
const TargetList = () => {
  const [targets, setTargets] = React.useState([
    { id: 1, name: 'Gardening', completed: true },
    { id: 2, name: 'Gardening', completed: false },
    { id: 3, name: 'Gardening', completed: true },
    { id: 4, name: 'Gardening', completed: false },
    { id: 5, name: 'Gardening', completed: false },
    { id: 6, name: 'Gardening', completed: false },
    { id: 7, name: 'Gardening', completed: false },
    { id: 8, name: 'Gardening', completed: false },
    { id: 9, name: 'Gardening', completed: false },
  ]);
  const handleToggle = (targetId, completed) => {
    const updatedTargets = targets.map(target =>
      target.id === targetId ? { ...target, completed } : target
    );
    setTargets(updatedTargets);

  };
  const gardeningTasks = targets.filter(target => target.name === 'Gardening');
  return (
    <div>
      {gardeningTasks.map(target => (
        <TargetCheckbox
          key={target.id}
          target={target}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
};
export default TargetList;
