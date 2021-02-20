import React from 'react';
import './Home.css';
import RecipeCategory from './RecipeCategory/RecipeCategory'
import Background from './Background/Background';

function Home(props) {
  
  return (
      <main className="Home">
        <Background imageUrl="https://previews.123rf.com/images/sasinparaksa/sasinparaksa1605/sasinparaksa160500061/56020754-old-scratched-wooden-cutting-board-texture.jpg" />
        <section className="Recipes-category-conteiner-relative">
          <section className="Recipes-category-conteiner">
            <section className="Recipes-category-wrapper">
              <RecipeCategory {...props} category="Salad" imageUlr="https://www.culinaryhill.com/wp-content/uploads/2019/09/Cobb-Salad-Recipe-Culinary-Hill-LR-square.jpg" />
              <RecipeCategory {...props} category="Meat" imageUlr="https://www.kitchensanctuary.com/wp-content/uploads/2019/07/Peri-Peri-Chicken-square-FS-7168.jpg" />
              <RecipeCategory {...props} category="Soup" imageUlr="https://i.pinimg.com/originals/37/72/c7/3772c7f68eca8ba3a4bc27a7d2e27aca.jpg" />
              <RecipeCategory {...props} category="Fish" imageUlr="https://irenamacri.com/wp-content/uploads/2017/08/paleo-sushi-nori-rolls-squarenew.jpg" />
              <RecipeCategory {...props} category="Pasta" imageUlr="https://www.sprinklesandsprouts.com/wp-content/uploads/2019/09/Creamy-Tomato-Chicken-and-Chorizo-Pasta-SQ-360x361.jpg" />
              <RecipeCategory {...props} category="Dessert" imageUlr="https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yMTU1OTk2OS9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTYzMzMzNzI3OX0._v_v25Ui65JxkOHSwNNHtpIAf63QzteUuaSMdMIfZOk/img.jpg?width=980" />
            </section>
          </section>
        </section>
     
        {/* <section className="Recipes-text-wrapper">
          <p>Random Recipe. ANXT. Random Recipe. Fight the Feeling. Random Recipe. Pack Your Bags. Random Recipe. Out of the Sky. Random Recipe. Strawberry Daiquiri. Random Recipe. Hey Boy. Random Recipe. Copycat. D-Bangerz, Random Recipe. Hamburg. Random Recipe.</p>
          <p>Random Recipe. ANXT. Random Recipe. Fight the Feeling. Random Recipe. Pack Your Bags. Random Recipe. Out of the Sky. Random Recipe. Strawberry Daiquiri. Random Recipe. Hey Boy. Random Recipe. Copycat. D-Bangerz, Random Recipe. Hamburg. Random Recipe.</p>
          <p>Random Recipe. ANXT. Random Recipe. Fight the Feeling. Random Recipe. Pack Your Bags. Random Recipe. Out of the Sky. Random Recipe. Strawberry Daiquiri. Random Recipe. Hey Boy. Random Recipe. Copycat. D-Bangerz, Random Recipe. Hamburg. Random Recipe.</p>
          <p>Random Recipe. ANXT. Random Recipe. Fight the Feeling. Random Recipe. Pack Your Bags. Random Recipe. Out of the Sky. Random Recipe. Strawberry Daiquiri. Random Recipe. Hey Boy. Random Recipe. Copycat. D-Bangerz, Random Recipe. Hamburg. Random Recipe.</p>
        </section> */}
      </main>
  )
};

export default Home;