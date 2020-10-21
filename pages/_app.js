import "../styles/index.css";
import { TodosProvider } from "../contexts/todos-context";

function MyApp({ Component, pageProps }) {
  return (
    <TodosProvider>
      <div className="container mx-auto py-10 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <Component {...pageProps} />
      </div>
    </TodosProvider>
  );
}

export default MyApp;
