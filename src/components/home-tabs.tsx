import { Tab } from "@headlessui/react";
import { useState } from "react";


export function MyTabs({ children }:
  { children: React.ReactNode[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="flex justify-center gap-4" >
        <Tab >Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </Tab.List>
      <Tab.Panel> {children[0]}</Tab.Panel>
      <Tab.Panel> {children[1]}</Tab.Panel>
      <Tab.Panel> {children[2]}</Tab.Panel>
    </Tab.Group>
  )
}
