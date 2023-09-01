import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { intervalToDuration, formatDuration, format, isAfter } from 'date-fns';
import { ja } from 'date-fns/locale';

export const HomeTasks = (props) => {
  const { tasks, selectListId, isDoneDisplay } = props;
  if (tasks === null) return <></>;
  const [nowTime, setNowTime] = useState(new Date());

  const updateInterval = 1;
  const doDisplay = isDoneDisplay == 'done';
  useEffect(() => {
    setInterval(() => {
      setNowTime(new Date());
    }, updateInterval * 1000);
  }, []);

  const MinFormat = (limit) => {
    const start = nowTime;
    const end = new Date(limit);
    const duration = intervalToDuration({ start, end });
    const formatted = formatDuration(duration, {
      format: ['years', 'months', 'days', 'hours', 'minutes', 'seconds'],
      locale: ja,
    });
    if (isAfter(start, end)) return `経過: ${formatted}`;
    return `残り: ${formatted}`;
  };

  return (
    <ul className="task-items">
      {tasks
        .filter((task) => {
          return task.done === doDisplay;
        })
        .map((task, key) => (
          <li key={key} className="task-item">
            <Link to={`/lists/${selectListId}/tasks/${task.id}`} className="task-item-link">
              <p className="task-title">{`タイトル: ${task.title}`}</p>
              <p className="task-done">{task.done ? '完了' : '未完了'}</p>
              <p className="task-limit">{`期限: ${format(
                new Date(task.limit),
                'yyyy/MM/dd HH:mm'
              )}`}</p>
              <p className="task-limit-duration">{MinFormat(task.limit)}</p>
            </Link>
          </li>
        ))}
    </ul>
  );
};