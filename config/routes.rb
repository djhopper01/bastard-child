BastardChild::Application.routes.draw do
  
  resources :grids

  root :to => 'home#show'

end
