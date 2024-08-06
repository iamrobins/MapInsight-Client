import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Flex,
} from '@chakra-ui/react';

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

  return (
    <Card maxW="sm">
      <CardBody
        onClick={() =>
          setPlace({ lat: location.latitude, lng: location.longitude })
        }
      >
        <Flex overflowX={'auto'}>
          {photos.map(photo => (
            <Image
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
          <Heading size="md">{placeName}</Heading>
          <Text>{summary ? summary : 'Loading...'}</Text>
          <Text>{address}</Text>
          <Text color="blue.600" fontSize="2xl">
            Rating: {rating}
          </Text>
        </Stack>
      </CardBody>

      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            as={'a'}
            href={gMapsUri}
            target="_blank"
            variant="solid"
            colorScheme="blue"
          >
            Directions
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default InsightsCard;
