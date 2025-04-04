"use client";

import { useContext, createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState("authenticating");

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

  async function signup(email, password) {
    try {
      const fetchResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const response = await fetchResponse.json();
      return response;
    } catch (error) {
      return {
        status: "error",
        message: "something went wrong",
      };
    }
  }

  async function login(email, password) {
    try {
      const fetchResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const response = await fetchResponse.json();
      if (response.status === "success") {
        setIsAuthenticated("authenticated");
      }
      return response;
    } catch (error) {
      return {
        status: "error",
        message: "something went wrong",
      };
    }
  }

  async function logout() {
    try {
      const fetchResponse = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const response = await fetchResponse.json();

      if (response.status === "success") {
        setIsAuthenticated("not-authenticated");
      }
      return response;
    } catch (error) {
      return {
        status: "error",
        message: "something went wrong",
      };
    }
  }

  return <AuthContext value={{ isAuthenticated, signup, login, logout }}>{children}</AuthContext>;
}

export function UserAuth() {
  return useContext(AuthContext);
}
