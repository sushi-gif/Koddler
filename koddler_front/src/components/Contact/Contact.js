import React from "react";
import {
  CForm,
  ContactContainer,
  ContactForm,
  ContactFormWrapper,
  FormSubtitle,
  FormTitle,
  GoBtn,
  HelpMenu,
  List,
  ListElement,
  Step,
  StepInput,
  StepSub,
  StepTextArea,
  Subtitle,
  Title,
  AssistanceContainer,
  ComponentContainer,
} from "./Contact.elements";
import Account from "./SubContacts/Account";
import Faq from "./SubContacts/Faq";
import Guarantee from "./SubContacts/Guarantee";
import HowTo from "./SubContacts/HowTo";
import Payment from "./SubContacts/Payment";
import Problems from "./SubContacts/Problems";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

const Contact = () => {
  const { url, path } = useRouteMatch();

  return (
    <>
      <ContactContainer>
        <HelpMenu>
          <Title> Assistenza </Title>

          <AssistanceContainer>
            <Subtitle> Menu assistenza </Subtitle>
            <List>
              <ListElement to={`${url}/how-to-use`}>
                {" "}
                Guida all'utilizzo{" "}
              </ListElement>
              <ListElement to={`${url}/faq`}> F.A.Q. </ListElement>
              <ListElement to={`${url}/problems`}> Problematiche </ListElement>
              <ListElement to={`${url}/account`}> Account </ListElement>
              <ListElement to={`${url}/payments`}> Pagamenti </ListElement>
            </List>
          </AssistanceContainer>

          <ComponentContainer>
            <Switch>
              <Route path={`${path}/how-to-use`} component={HowTo} />
              <Route path={`${path}/faq`} component={Faq} />
              <Route path={`${path}/problems`} component={Problems} />
              <Route path={`${path}/guarantee`} component={Guarantee} />
              <Route path={`${path}/account`} component={Account} />
              <Route path={`${path}/payments`} component={Payment} />
              <Redirect from="/help" to={`${path}/how-to-use`} />
            </Switch>
          </ComponentContainer>
        </HelpMenu>
        <ContactFormWrapper>
          <ContactForm>
            <FormTitle> Ottieni supporto ovunque </FormTitle>
            <FormSubtitle>
              {" "}
              Contattaci per trovare le risposte sui nostri prodotti, per
              parlare con un'esperto o prenotare un'incontro.{" "}
            </FormSubtitle>

            <CForm>
              <Step> Step 1 </Step>
              <StepSub> Aggiungi il tuo nome </StepSub>
              <StepInput type="text" placeholder="Nome Completo" />

              <Step> Step 2 </Step>
              <StepSub> Aggiungi i tuoi dati di contatto </StepSub>
              <StepInput type="email" placeholder="Indirizzo email" />

              <Step> Step 3 </Step>
              <StepSub> Comunicaci la tua richiesta </StepSub>
              <StepTextArea type="text" placeholder="Il tuo messaggio" />

              <GoBtn> Invia </GoBtn>
            </CForm>
          </ContactForm>
        </ContactFormWrapper>
      </ContactContainer>
    </>
  );
};

export default Contact;
