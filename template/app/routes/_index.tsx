import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const meta: MetaFunction = () => {
  return [
    { title: "Test" },
    { name: "description", content: "Test" },
  ]
}

const Layout = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.fg};
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Index() {
  const [jsStatus, setJsStatus] = useState('JS is disabled (SSR)')

  useEffect(() => {
    setJsStatus('JS is enabled (hydrated)')
  }, [setJsStatus])

  return (
    <Layout>
      <Box>
        <h1>{jsStatus}</h1>
      </Box>
    </Layout>
  )
}
