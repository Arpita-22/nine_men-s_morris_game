Rails.application.routes.draw do
  resources :players, only: [:index, :show, :create, :new, :update]
  resources :games, only: [:index, :create, :new, :edit, :update, :destroy]
  resources :pieces
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
