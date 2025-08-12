import { AddInstructor } from "./components/AddInstructor"
import { TableInstructores } from "./components/TableInstructores"

import { IconPlus } from "@tabler/icons-react"
export const Instructores = () => {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <AddInstructor icon={<IconPlus/>} triggerMessage="Registrar Nuevo Instructor" mode="create" />
      <div className="">
        <TableInstructores/>
      </div>
    </div>
  )
}
