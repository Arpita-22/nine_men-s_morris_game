Rails.application.routes.draw do
  resources :players, only: [:index, :show, :create, :new]
  resources :games, only: [:index, :create, :new]
  resources :pieces
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
