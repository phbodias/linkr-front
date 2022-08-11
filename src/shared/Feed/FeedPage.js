import { Container, Title, InnerContainer, RightInnerContainer, LeftInnerContainer, SubTitle, TextContent, SubItems} from "./FeedStyle";
import { useNavigate } from "react-router-dom";

export function FeedPage({title, forms, posts, hashtags}){
    const navigate = useNavigate();
    
    return (
       <>
        <Container>
            <Title>
                {title}
            </Title>
            <InnerContainer>
                <LeftInnerContainer>
                    {forms ? forms : null}
                    {posts}
                </LeftInnerContainer>
                <RightInnerContainer>
                    <SubTitle>
                        trendings
                    </SubTitle>
                    <SubItems>

                    { hashtags ?
                    hashtags.map((item,index)=>{
                      return <TextContent key={index} onClick={()=>navigate(`/hashtag/${item}`)} >
                        {`#${item}`}
                      </TextContent>    
                    })
                    : null } 
                    </SubItems>
                </RightInnerContainer>
            </InnerContainer>
            
        </Container>
       </>
    );
}
