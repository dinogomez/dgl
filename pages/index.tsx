import { Inter } from 'next/font/google'
import { Text, Spacer } from "@nextui-org/react";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Text h1>Evolved Versatile Engine</Text>
      <hr />
      <br></br>
       <Text size="$lg" >
          Eve is a early working port of the gtech-recital-library to the javascript ecosystem. First developed by <b>Dino R. Gomez</b> as a solution to various enterprise level system demands. It is robust, fast and versatile. It was later ported to the javascript ecosystem using typescript by his son <b>Paul Gomez</b>.
       </Text>
    </>
  )
}
