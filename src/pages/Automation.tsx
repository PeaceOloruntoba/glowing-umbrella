import { useAppSelector } from '../app/hooks';
import { RuleBuilder } from '../features/automation/components/RuleBuilder';

export default function Automation() {
  const tasks = useAppSelector(s => s.automation.tasks);

  return (
    <>
      {tasks.map((task, index) => (
        <RuleBuilder key={index} task={task} taskIndex={index} />
      ))}
    </>
  );
}
