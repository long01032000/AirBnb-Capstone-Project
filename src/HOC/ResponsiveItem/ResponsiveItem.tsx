import React from 'react'

type Props = {
    Component: React.FC,
    // ComponentJSX: JSX.Element
}

export default function ResponsiveItem({Component}: Props) {
    let ComponentRender = Component;
  return (
    <>
    <ComponentRender/>
    </>
  )
}