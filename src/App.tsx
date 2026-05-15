import {Route, Routes} from "react-router-dom";
import WeekView from "./pages/WeekView.tsx";
import Nav from "./components/Nav.tsx";
import MonthView from "./pages/MonthView.tsx";
import DayView from "./pages/DayView.tsx";
import Profile from "./pages/Profile.tsx";
import ProfileLayout from "./pages/ProfileLayout.tsx";
import Statistics from "./pages/Statistics.tsx";
import OneTimeGoalsView from "./pages/OneTimeGoalsView.tsx";
import Modal from "./components/Modal.tsx";
import AddGoalForm from "./components/AddGoalForm.tsx";
import GoalsProvider from "./contexts/GoalsProvider.tsx";
import { useGoals } from "./contexts/useGoalsHook.ts";

function AppContent() {
    const { showModal, setShowModal } = useGoals();

    return (
        <main className="main-page-container">
          <Nav />
          <Routes>
              <Route index element={<DayView />}/>
              <Route path="/week" element={<WeekView />} />
              <Route path="/month" element={<MonthView />} />
              <Route path="/one-time" element={<OneTimeGoalsView />} />
              <Route path="/profile" element={<ProfileLayout />}>
                  <Route index element={<Statistics />} />
                  <Route path="manage-goals" element={<Profile />} />
              </Route>
          </Routes>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <AddGoalForm />
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
