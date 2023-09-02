"use client";
import { useState  } from "react";
import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/navigation";


export default function DeleteButton({ id }) {
  const router = useRouter();
  const ticketId = id;
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const res = await fetch(`http://localhost:3000/api/tickets/${ticketId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    setIsLoading(false);
    if (data.error) {
      console.log("error", data.error);
    } else {
      console.log("success, redirect to login page");
      router.refresh();
      router.push("/tickets");
    }
  }

  return (
    <button
      className="btn-primary ml-auto"
      onClick={handleClick}
      disabled={isLoading}
    >
      {
        isLoading &&
        <>
          <TiDelete />
          Deleting...
        </>
      }
      {
        !isLoading &&
        <>
          <TiDelete />
          Delete Ticket
        </>
      }
    </button>
  )
}
