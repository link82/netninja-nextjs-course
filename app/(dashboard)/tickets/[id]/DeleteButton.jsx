"use client";
import { useState  } from "react";
import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteTicket } from "../actions";


export default function DeleteButton({ id }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition()


  return (
    <button
      className="btn-primary ml-auto"
      onClick={() => startTransition(() => deleteTicket(id))}
      disabled={pending}
    >
      {
        pending &&
        <>
          <TiDelete />
          Deleting...
        </>
      }
      {
        !pending &&
        <>
          <TiDelete />
          Delete Ticket
        </>
      }
    </button>
  )
}
