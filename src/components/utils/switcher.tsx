import { Switch } from "@headlessui/react";
export function PublicSwitch(
  { publicCollection, setPublicCollection: setPublicCollection }: { publicCollection: boolean, setPublicCollection: (publicCollection: boolean) => void }
) {

  return (
    <div className="">
      <Switch
        checked={publicCollection}
        onChange={setPublicCollection}
        className={`${publicCollection ? 'bg-teal-900' : 'bg-teal-700'}
relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Collection Public</span>
        <span
          aria-hidden="true"
          className={`${publicCollection ? 'translate-x-9' : 'translate-x-0'}
pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <h1> {String(publicCollection)} </h1>
    </div>
  )

}
