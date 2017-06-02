import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const styled = {
	width: "100%",
	margin: "0 auto"
}
const FeedContainer = ({image}) => {
	return(
		<Card style={styled}>
			<Image src={`/images/${image}.jpg`}/>
			<Card.Content>
				<Card.Header>Daniel_{image}</Card.Header>
				<Card.Meta>Joined in 2016</Card.Meta>
				<Card.Description>
					Daniel is a comedian living in Nashville.
					<br/>Daniel is a comedian living in Nashville.
					<br/>Daniel is a comedian living in Nashville.
					<br/>Daniel is a comedian living in Nashville.
					<br/>Daniel is a comedian living in Nashville.
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<a>
				<Icon name='user' />
					10 Friends
				</a>
			</Card.Content>
		</Card>
	)
}

export default FeedContainer