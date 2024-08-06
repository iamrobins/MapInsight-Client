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
  VStack,
} from '@chakra-ui/react';
import SampleData from '../../SampleData';

function InsightsCard() {
  console.log(SampleData);
  const places = SampleData.data.places;

  return (
    <VStack spacing={4}>
      {places.map(place => (
        <Card maxW="sm" key={place.id}>
          <CardBody>
            <Flex overflowX={'auto'}>
              {place.photos.map(photo => (
                <Image
                  mx="1"
                  key={photo.name.split('/').pop()}
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${900}&maxheight=${250}&photoreference=${photo.name
                    .split('/')
                    .pop()}&key=${process.env.REACT_APP_MAP_INSIGHT_GCP_KEY}`}
                  alt={photo.authorAttributions[0].displayName}
                  borderRadius="lg"
                />
              ))}
            </Flex>
            <Stack mt="6" spacing="3">
              <Heading size="md">{place.displayName.text}</Heading>
              <Text>
                A perfect place for japan real flavour, Little bit expensive but
                eveyone loved their food. Main highlights were portion size,
                hygeine, staff and the envionment.
              </Text>
              <Text>{place.formattedAddress}</Text>
              <Text color="blue.600" fontSize="2xl">
                Rating: 4.5
              </Text>
            </Stack>
          </CardBody>

          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                as={'a'}
                href={place.googleMapsUri}
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
      ))}
    </VStack>
  );
}

export default InsightsCard;
