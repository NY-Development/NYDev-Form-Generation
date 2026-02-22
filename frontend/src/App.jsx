import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import AppRouter from "./router/AppRouter.jsx";
import {createClient} from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-1 flex flex-col">
        <AppRouter />
      </div>
      <Footer />
    </div>
  );
};

export default App;
