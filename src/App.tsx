import AppRouter from "@/routes/index"; 
import AppProvider from "./contexts";

// App Component
function App() {
  return (
    <AppProvider>
        <AppRouter />
    </AppProvider>
  );
}

export default App;
