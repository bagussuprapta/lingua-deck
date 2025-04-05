"use client";

import { useContext, createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState("authenticating");
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    async function authUser() {
      try {
        const fetchResponse = await fetch("/api/auth/me");
        const response = await fetchResponse.json();

        if (response?.status === "error") {
          setIsAuthenticated("not-authenticated");
        } else if (response?.status === "success") {
          setIsAuthenticated("authenticated");
        }
      } catch (error) {
        setIsAuthenticated("not-authenticated");
      }
    }

    authUser();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authMessage) return;

    const timeout = setTimeout(() => {
      setAuthMessage("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [authMessage]);

  async function signup(username, email, password) {
    try {
      const fetchResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const response = await fetchResponse.json();
      setAuthMessage(response.message);
      return response;
    } catch (error) {
      setAuthMessage("Something went wrong");
    }
  }

  async function signin(email, password) {
    try {
      const fetchResponse = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const response = await fetchResponse.json();
      if (response.status === "success") {
        setIsAuthenticated("authenticated");
      }
      setAuthMessage(response.message);
    } catch (error) {
      setAuthMessage("Something went wrong");
    }
  }

  async function signout() {
    try {
      const fetchResponse = await fetch("/api/auth/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const response = await fetchResponse.json();

      if (response.status === "success") {
        setIsAuthenticated("not-authenticated");
      }
      return response;
    } catch (error) {
      setAuthMessage("Something went wrong");
    }
  }

  return <AuthContext value={{ isAuthenticated, authMessage, setAuthMessage, signup, signin, signout }}>{children}</AuthContext>;
}

export function UserAuth() {
  return useContext(AuthContext);
}
