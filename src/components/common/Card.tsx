import { Box, useColorMode } from "@chakra-ui/react"
import { PropsWithChildren } from "react"
import { Rest } from "types"

type Props = {
  isFullWidthOnMobile?: boolean
} & Rest

const Card = ({
  isFullWidthOnMobile = false,
  children,
  ...rest
}: PropsWithChildren<Props>): JSX.Element => {
  const { colorMode } = useColorMode()

  return (
    <Box
      mx={
        // using !important so styles added by wrappers like Stack don't override it
        isFullWidthOnMobile && {
          base: "calc(var(--chakra-space-4) * -1) !important",
          sm: "0 !important",
        }
      }
      bg={colorMode === "light" ? "white" : "gray.700"}
      shadow="md"
      borderRadius="none"
      display="flex"
      flexDirection="column"
      overflow="hidden"

      {...rest}
    >
      {children}
    </Box>
  )
}

export default Card
