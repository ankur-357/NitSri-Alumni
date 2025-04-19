import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientApp from "./ClientApp";
import AdminApp from "./src/adminApp";

function App() {
    return (
        <Router>
            <Routes>
                {/* Client App Routes */}
                <Route path="/*" element={<ClientApp />} />

                {/* Admin App Routes */}
                <Route path="/admin/*" element={<AdminApp />} />
            </Routes>
        </Router>
    );
}

export default App;
