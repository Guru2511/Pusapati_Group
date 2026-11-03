import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitIntake } from "@/lib/server-fns";

export function useIntake() {
  const submit = useServerFn(submitIntake);
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  const run = async (payload) => {
    setState("pending");
    setError("");
    try {
      await submit({ data: payload });
      setState("done");
      return true;
    } catch (e) {
      setState("error");
      setError(
        e?.message?.includes("validation") || e?.status === 400
          ? "Please check the details you entered and try again."
          : "We could not send your enquiry. Please try again or call our team."
      );
      return false;
    }
  };

  const reset = () => {
    setState("idle");
    setError("");
  };

  return { state, error, run, reset, pending: state === "pending", done: state === "done" };
}