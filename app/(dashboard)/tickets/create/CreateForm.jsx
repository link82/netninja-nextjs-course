import { addTicket } from "../actions"
import SubmitButton from "@/app/components/SubmitButton"

export default function CreateForm() {

  // using server action
  return (
    <form action={addTicket} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required  
          name="title"
          type="text"
        />
      </label>
      <label>
        <span>Description:</span>
        <textarea
          name="body"
          required
        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          name="priority"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <SubmitButton />
    </form>
  )
}