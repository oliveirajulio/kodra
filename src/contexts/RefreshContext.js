import { createContext, useContext, useState } from "react";

const TaskRefreshContext = createContext();

export function TaskRefreshProvider({ children }) {
  const [refreshCount, setRefreshCount] = useState(0);

  const triggerRefresh = () => {
    setRefreshCount(prev => prev + 1);
  };

  return (
    <TaskRefreshContext.Provider value={{ refreshCount, triggerRefresh }}>
      {children}
    </TaskRefreshContext.Provider>
  );
}

// Hook para acessar o contexto com facilidade
export function useTaskRefresh() {
  return useContext(TaskRefreshContext);
}
