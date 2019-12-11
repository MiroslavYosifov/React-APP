import React from 'react';
import './Home.css';
import RecipeCategory from './RecipeCategory/RecipeCategory'
import Background from './Background/Background';

function Home(props) {
  console.log(props);
  
  return (
      <main className="Home">
        <Background imageUrl="https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
        <section className="Recipes-category-conteiner">
          <section className="Recipes-category-wrapper">
            <RecipeCategory {...props} category="Salad" imageUlr="https://www.culinaryhill.com/wp-content/uploads/2019/09/Cobb-Salad-Recipe-Culinary-Hill-LR-square.jpg" />
            <RecipeCategory {...props} category="Meat" imageUlr="https://www.kitchensanctuary.com/wp-content/uploads/2019/07/Peri-Peri-Chicken-square-FS-7168.jpg" />
            <RecipeCategory {...props} category="Soup" imageUlr="https://i.pinimg.com/originals/37/72/c7/3772c7f68eca8ba3a4bc27a7d2e27aca.jpg" />
            <RecipeCategory {...props} category="Fish" imageUlr="https://irenamacri.com/wp-content/uploads/2017/08/paleo-sushi-nori-rolls-squarenew.jpg" />
            <RecipeCategory {...props} category="Pasta" imageUlr="https://www.sprinklesandsprouts.com/wp-content/uploads/2019/09/Creamy-Tomato-Chicken-and-Chorizo-Pasta-SQ-360x361.jpg" />
            <RecipeCategory {...props} category="Dessert" imageUlr="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/50/2017/01/square-cake.jpg" />
          </section>
        </section>
        <section className="Recipes-text-wrapper">
          <p>Random Recipe. ANXT. Random Recipe. Fight the Feeling. Random Recipe. Pack Your Bags. Random Recipe. Out of the Sky. Random Recipe. Strawberry Daiquiri. Random Recipe. Hey Boy. Random Recipe. Copycat. D-Bangerz, Random Recipe. Hamburg. Random Recipe.</p>
          <p>Random Recipe. ANXT. Random Recipe. Fight the Feeling. Random Recipe. Pack Your Bags. Random Recipe. Out of the Sky. Random Recipe. Strawberry Daiquiri. Random Recipe. Hey Boy. Random Recipe. Copycat. D-Bangerz, Random Recipe. Hamburg. Random Recipe.</p>
          <p>Random Recipe. ANXT. Random Recipe. Fight the Feeling. Random Recipe. Pack Your Bags. Random Recipe. Out of the Sky. Random Recipe. Strawberry Daiquiri. Random Recipe. Hey Boy. Random Recipe. Copycat. D-Bangerz, Random Recipe. Hamburg. Random Recipe.</p>
          <p>Random Recipe. ANXT. Random Recipe. Fight the Feeling. Random Recipe. Pack Your Bags. Random Recipe. Out of the Sky. Random Recipe. Strawberry Daiquiri. Random Recipe. Hey Boy. Random Recipe. Copycat. D-Bangerz, Random Recipe. Hamburg. Random Recipe.</p>
        </section>
      </main>
  )
};

export default Home;