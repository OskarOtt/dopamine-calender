import {Route, Routes} from "react-router-dom";
import WeekView from "./pages/WeekView.tsx";
import Nav from "./components/Nav.tsx";
import MonthView from "./pages/MonthView.tsx";
import DayView from "./pages/DayView.tsx";
import Profile from "./pages/Profile.tsx";
import Modal from "./components/Modal.tsx";
import AddGoalForm from "./components/AddGoalForm.tsx";
import { GoalsProvider, useGoals } from "./contexts/GoalsContext.tsx";

function AppContent() {
    const { showModal, setShowModal, newGoal, setNewGoal, handleAddGoal } = useGoals();

    return (
        <main className="main-page-container">
          <Nav />
          <Routes>
              <Route index element={<DayView />}/>
              <Route path="/week" element={<WeekView />} />
              <Route path="/month" element={<MonthView />} />
              <Route path="/profile" element={<Profile />} />
          </Routes>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <AddGoalForm
                  newGoal={newGoal}
                  setNewGoal={setNewGoal}
                  handleAddGoal={handleAddGoal}
              />
          </Modal>
        </main>
    );
}

function App() {
    return (
        <GoalsProvider>
            <AppContent />
        </GoalsProvider>
    );
}

export default App;
