import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const PreferencesPage = () =>  {

  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Preferences</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize CollabAI to work the way you do.
        </p>
      </div>
      <section>
        <div className="mt-5">
        <h3 className="font-semibold font-sans tracking-tight leading-tight text-lg">Appearence</h3>
        </div>
        <Separator className="mb-5"/>
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-muted-foreground">Theme</span>
                <span className="truncate text-sm">Choose a theme for CollabAI</span>
            </div>
            <Select defaultValue="system">
            <SelectTrigger className="w-44">
             <SelectValue />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="system">Use system settings</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            </SelectContent>
            </Select>
        </div>
      </section>
      <section>
        <div className="mt-5">
        <h3 className="font-semibold font-sans tracking-tight leading-tight text-lg">Language</h3>
        </div>
        <Separator className="mb-5"/>
         <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-muted-foreground">Language</span>
                <span className="truncate text-sm">Choose the langugae you want for CollabAI</span>
            </div>
           <Select defaultValue="en-us">
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-us">English (US)</SelectItem>
              <SelectItem value="en-gb">English (UK)</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
      <section>
        <div className="mt-5">
        <h3 className="font-semibold font-sans tracking-tight leading-tight text-lg">Privacy</h3>
        </div>
        <Separator className="mb-5"/>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-muted-foreground">Cookies setting</span>
                <span className="truncate text-sm">See the cookie notice for more information</span>
            </div>
           <Select defaultValue="en-us">
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-us">English (US)</SelectItem>
              <SelectItem value="en-gb">English (UK)</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
    </div>
  );
}

export default PreferencesPage;