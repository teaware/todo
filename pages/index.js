import { useEffect, useContext } from "react";
import Head from "next/head";
import { table, minifyRecords } from "./api/utils/airtable";
import Todo from "../components/todo";
import TodoForm from "../components/todo-form";
import { TodosContext } from "../contexts/todos-context";
import auth0 from "./api/utils/auth0";

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext);
  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div className="px-4">
      <Head>
        <title>Simple Todos</title>
      </Head>

      <main>
        <nav>
          {user ? (
            <div className="flex justify-center">
              <img
                src={user.picture}
                alt="Profile"
                className="w-16 h-16 rounded-full mb-6"
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800 md:text-3xl">
              <span className="cursor-default bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500">
                Simple Todos
              </span>
            </div>
            <div>
              {user ? (
                <a
                  href="/api/logout"
                  className="font-semibold text-teal-500 hover:text-teal-600 transition ease-in-out duration-150"
                >
                  Logout
                </a>
              ) : (
                <a
                  href="/api/login"
                  className="font-semibold text-teal-500 hover:text-teal-600 transition ease-in-out duration-150"
                >
                  Login →
                </a>
              )}
            </div>
          </div>
        </nav>
        {user ? (
          <>
            <TodoForm />
            <ul>
              {todos && todos.map((todo) => <Todo todo={todo} key={todo.id} />)}
            </ul>
          </>
        ) : (
          <p className="text-center text-xl mt-16">
            Please login to save todos!
          </p>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  let todos = [];
  if (session?.user) {
    todos = await table
      .select({ filterByFormula: `userId = '${session.user.sub}'` })
      .firstPage();
  }
  return {
    props: {
      initialTodos: minifyRecords(todos),
      user: session?.user || null,
    },
  };
}
