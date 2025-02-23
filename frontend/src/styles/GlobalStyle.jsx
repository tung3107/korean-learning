import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Define color variables for both modes */
  :root {
    /* Light Mode Variables */
    --white: #FFFFFF;
    --silver: #F5F7FA;
    --greyblue: #ABBED1;
    --tint1: #66BB69;
    --tint2: #81C784;
    --tint3: #A5D6A7;
    --tint4: #C8E6C9;
    --tint5: #E8F5E9;
    --tint6: #4CAF4F;
    --shade1: #43A046;
    --shade2: #388E3B;
    --shade3: #237d31;
    --shade4: #1B5E1F;
    --shade5: #103E13;
    --L_Grey: #89939E;
    --grey: #717171;
    --dgrey: #4D4D4D;
    --lightwhite: #f1f1f1;
    --secondary: #263238;
    --primary: #28CB8B;
    --success: #2E7D31;
    --error: #E53835;
    --warning: #FBC02D;
    --color-dark-header:rgb(82, 82, 82);
    --color-dark-900-header:rgb(121, 117, 117);

  }

  :root.dark-mode {
    /* Dark Mode Variables */
    --white: #263238;
    --silver: #4D4D4D;
    --greyblue: #717171;
    --tint1: #237d31;
    --tint2: #388E3B;
    --tint3: #2E7D31;
    --tint4: #1B5E1F;
    --tint5: #103E13;
    --tint6: #4CAF4F;
    --shade1: #66BB69;
    --shade2: #81C784;
    --shade3: #A5D6A7;
    --shade4: #C8E6C9;
    --shade5: #E8F5E9;
    --L_Grey: #ABBED1;
    --grey: #89939E;
    --dgrey: #F5F7FA;
    --lightwhite: #263238;
    --secondary: #FFFFFF;
    --primary: #28CB8B;
    --success: #81C784;
    --error: #E53835;
    --warning: #FBC02D;
    --backdrop-color: rgba(255, 255, 255, 0.1);
  }

  /* Apply the colors */
  body {
    background-color: var(--white);
    color: var(--grey);
    transition: all 0.3s ease-in-out;
  }
`;

export default GlobalStyle;
