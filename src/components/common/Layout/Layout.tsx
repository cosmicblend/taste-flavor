import {
  AspectRatio,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect"
import Head from "next/head"
import { PropsWithChildren, ReactNode, useRef, useState } from "react"
import GuildLogo from "../GuildLogo"
import Header from "./components/Header"
import Footer from "./components/Footer"

type Props = {
  imageUrl?: string
  imageBg?: string
  title: string
  description?: string
  showLayoutDescription?: boolean
  textColor?: string
  action?: ReactNode | undefined
  background?: string
  backgroundImage?: string
}

const Layout = ({
  imageUrl,
  imageBg,
  title,
  description,
  showLayoutDescription,
  textColor,
  action,
  background,
  backgroundImage,
  children,
}: PropsWithChildren<Props>): JSX.Element => {
  const childrenWrapper = useRef(null)
  const [bgHeight, setBgHeight] = useState("0")
  const isMobile = useBreakpointValue({ base: true, sm: false })

  useIsomorphicLayoutEffect(() => {
    if ((!background && !backgroundImage) || !childrenWrapper?.current) return

    const rect = childrenWrapper.current.getBoundingClientRect()
    setBgHeight(`${rect.top + (isMobile ? 32 : 36)}px`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, childrenWrapper?.current, action])

  // const router = useRouter()

  const guildLogoSize = useBreakpointValue({ base: 48, lg: 56 })
  const guildLogoIconSize = useBreakpointValue({ base: 20, lg: 28 })

  return (
    <Box>
      <Head>
        <title>{`${title}`}</title>
        <meta property="og:title" content={`${title}`} />
        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
          </>
        )}
      </Head>

      <Box
        zIndex={10}
        bgColor={"black"}
        width={"100%"}
        backgroundSize={"cover"}
        d="flex"
        flexDir={"column"}
        justifyContent="center"
        overflowX="hidden"
      >
        <Header />
        <Container
          // to be above the absolutely positioned background box
          position="relative"
          maxW="container.lg"
          pt={{ base: 6, md: 9 }}
          pb={24}
          px={{ base: 4, sm: 6, md: 8, lg: 10 }}
          zIndex={1}
        >
          <VStack spacing={{ base: 7, md: 10 }} pb={{ base: 9, md: 14 }} w="full">
            <HStack justify="center" w="full" spacing={3}>
              <HStack
                flexDirection="column"
                justify="center"
                spacing={{ base: 4, lg: 5 }}
              >
                {imageUrl && (
                  <GuildLogo
                    imageUrl={imageUrl}
                    size={guildLogoSize}
                    iconSize={guildLogoIconSize}
                    mt={{ base: 1, lg: 2 }}
                    bgColor={imageBg ? imageBg : undefined}
                    priority
                  />
                )}
                <Heading
                  marginTop={12}
                  as="h1"
                  fontSize={40}
                  fontFamily="PressStart2P"
                  color={"#FFF3BF"}
                  fontWeight="bold"
                  wordBreak={"break-word"}
                  textAlign="center"
                >
                  {title}
                </Heading>

                <Flex>
                  <Container width={350} margingTop={-32}>
                    <AspectRatio maxW={350} height={343} ratio={1} autoPlay={true}>
                      <iframe
                        title="fire-breathing-gif"
                        src="https://www.kapwing.com/e/6216f880e8513f007fc21173"
                      />
                    </AspectRatio>
                  </Container>
                  <Link
                    target="_blank"
                    href={`https://discord.com/channels/933057635790491768/933076807157182514`}
                    prefetch={false}
                    _hover={{ textDecor: "none" }}
                  >
                    <Image
                      alt="join discord"
                      width={363}
                      height={85.25}
                      src="assets/joinDiscord.png"
                    />
                  </Link>
                </Flex>

              </HStack>
              {action}
            </HStack>
            {showLayoutDescription && description?.length && (
              <Text w="full" fontWeight="semibold" color={textColor}>
                {description}
              </Text>
            )}
          </VStack>
          <Box ref={childrenWrapper}>{children}</Box>
        </Container>

        <Image
          alt="fire"
          width={1800}
          height={500}
          src="flavorLogos/fire.svg"
          marginTop={-80}
        />
        <Text
          as="h2"
          fontSize={40}
          fontFamily="PressStart2P"
          color={"#FFF3BF"}
          wordBreak={"break-word"}
          textAlign="center"
        >
          See What We Are About
        </Text>
        <Container width={350} margingTop={-32}>
          <AspectRatio maxW={350} height={343} ratio={1} autoPlay={true}>
            <iframe
              title="fire-breathing-gif"
              src="https://www.kapwing.com/e/6216f880e8513f007fc21173"
            />
          </AspectRatio>
        </Container>
        <Center>
          <Text
            fontSize="24"
            fontFamily="PressStart2P"
            color="#FFF3BF"
            width={940}
            marginLeft={4}
          >
            <br />
            Flavor is the Treasure guild serving up the spice ??? join us to learn about $MAGIC and gaming NFTs, max out your $MAGIC yields, swap alpha, and much more...
            <br />
            <br />
            $MAGIC started off as writing on tile... just another project in the sea of Loot derivatives. Now, it???s a thriving ecosystem of composable metaverses integrating NFT & DeFi elements, built on one of the leading Ethereum layer 2 chains, Arbitrum.
            <br />
            <br />
            Life moves quickly in Web3. Join our community and you???ll be cooking in no time ??? with only the best recipes in Bridgeworld!
          </Text>
        </Center>
        <Center margin={8}>
          <Link
            target="_blank"
            href={`https://airtable.com/shr4PJoVfeBvGm2yZ`}
            prefetch={false}
            _hover={{ textDecor: "none" }}
          >
            <Image
              alt="join discord"
              width={337}
              height={68}
              src="assets/stakeWithUs.png"
            />
          </Link>
        </Center>
        <Footer />
      </Box>
    </Box>
  )
}

export default Layout
