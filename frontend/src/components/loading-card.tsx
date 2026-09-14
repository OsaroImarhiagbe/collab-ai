
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


export default function DialogDemo() {
  return (
    <Dialog>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Creating Workspace...</DialogTitle>
            <DialogDescription>
              We are currently making your workspace
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  )
}
