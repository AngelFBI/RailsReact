Rails.application.routes.draw do
  root 'products#index'
  namespace :api do
    namespace :v1 do
      resources :products do
        resources :comments, only: [:create, :index]
      end

      resources :users, only: [:create] do
        collection do
          get :get_current_user
        end
      end

      post '/signin', to: 'sessions#create'
      delete '/signout', to: 'sessions#destroy', as: 'session'
    end
  end
  get '*path', to: 'products#index'
end
