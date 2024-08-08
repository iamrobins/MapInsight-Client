import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
  HStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import ReviewCard from './ReviewCard';
import {
  FaMapMarkerAlt,
  FaRegSmileBeam,
  FaRegSmile,
  FaRegSadCry,
  FaPhone,
  FaGlobeEurope,
} from 'react-icons/fa';

function InsightsCard({ place, setPlace }) {
  const {
    placeName,
    address,
    location,
    phoneNumber,
    photos,
    rating,
    userRatingCount,
    summary,
    website,
    gMapsUri,
    reviews,
  } = place;
  const cardBg = useColorModeValue('#FFFFFF', 'black');
  const positiveColor = useColorModeValue('green.400', 'green.300');
  const negativeColor = useColorModeValue('red.400', 'red.300');
  const overallImpressionColor = useColorModeValue('blue.400', 'blue.300');

  return (
    <Card m="1" bg={cardBg}>
      <CardBody>
        <Flex overflowX={'auto'}>
          {photos.map(photo => (
            <Image
              onClick={() =>
                setPlace({ lat: location.latitude, lng: location.longitude })
              }
              mx="1"
              key={photo.name.split('/').pop()}
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${900}&maxheight=${250}&photoreference=${photo.name
                .split('/')
                .pop()}&key=${process.env.REACT_APP_MAP_INSIGHT_GCP_KEY}`}
              alt={photo.name.split('/').pop()}
              borderRadius="lg"
            />
          ))}
        </Flex>
        <Stack mt="6" spacing="3">
          <Heading
            fontWeight={'semibold'}
            _hover={{ textDecoration: 'underline' }}
            as="a"
            href={gMapsUri}
            target="_blank"
            size="md"
          >
            {placeName}
          </Heading>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Summary</Tab>
              <Tab>Reviews</Tab>
            </TabList>
            <TabPanels>
              <TabPanel maxHeight={'300px'} overflowY={'auto'}>
                <VStack my="2">
                  <Heading size={'md'} color={positiveColor}>
                    Positives
                  </Heading>

                  {summary?.key_positives &&
                    summary.key_positives.map(key_positive => (
                      <Text
                        fontSize={'15px'}
                        fontStyle={'italic'}
                        key={key_positive}
                      >
                        - {key_positive}
                      </Text>
                    ))}
                </VStack>
                <VStack my="2">
                  <Heading size={'md'} color={negativeColor}>
                    Negatives
                  </Heading>
                  {summary?.key_negatives &&
                    summary.key_negatives.map(key_negative => (
                      <Text
                        fontSize={'15px'}
                        fontStyle={'italic'}
                        key={key_negative}
                      >
                        - {key_negative}
                      </Text>
                    ))}
                </VStack>
                <VStack my="2">
                  <Heading size={'md'} color={overallImpressionColor}>
                    Overall Impressions
                  </Heading>
                  {summary?.overall_impression && (
                    <Text fontSize={'15px'} fontStyle={'italic'}>
                      {summary.overall_impression}
                    </Text>
                  )}
                </VStack>
              </TabPanel>
              <TabPanel maxHeight={'300px'} overflowY={'auto'}>
                {reviews &&
                  reviews.length > 0 &&
                  reviews.map((review, index) => (
                    <ReviewCard
                      key={review.authorName + review.publishTime}
                      {...review}
                      index={index}
                    />
                  ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </CardBody>

      <Divider />
      <CardFooter alignItems={'flex-start'} flexDir={'column'}>
        <HStack justifyContent={'center'} alignItems={'center'}>
          <FaMapMarkerAlt />
          <Text fontSize={'14px'}>{address}</Text>
        </HStack>
        <HStack justifyContent={'center'} alignItems={'center'}>
          {rating >= 4.5 ? (
            <FaRegSmileBeam />
          ) : rating > 3 ? (
            <FaRegSmile />
          ) : (
            <FaRegSadCry />
          )}
          <Text fontSize={'14px'}>
            {rating} - ({userRatingCount} reviews)
          </Text>
        </HStack>
        <HStack justifyContent={'center'} alignItems={'center'}>
          <FaPhone />
          <Text fontSize={'14px'}>{phoneNumber}</Text>
        </HStack>
        <HStack justifyContent={'center'} alignItems={'center'}>
          <FaGlobeEurope />
          <Link href={website} target="_blank" fontSize={'14px'}>
            {website.split('/')[2]}
          </Link>
        </HStack>
      </CardFooter>
    </Card>
  );
}

export default InsightsCard;
