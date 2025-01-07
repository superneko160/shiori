import { Button } from "@/components/ui/button"

export function EditButton() {
  return (
    <div className="m-1">
      <Button variant="secondary" className="w-24">
        編集
      </Button>
    </div>
  )
}

export function DeleteButton() {
  return (
    <div className="m-1">
      <Button variant="destructive" className="w-24">
        削除
      </Button>
    </div>
  )
}
